import type { NextApiRequest, NextApiResponse } from "next";
import {
  parseForm,
  FormidableError,
} from "../../../lib/createProduct/parse-form";
// Inner functions

// Mongoose
import { connectMongo } from "../../../db/connectDb";
import { ObjectId } from "mongodb";
// Mongoose models
import Product from "../../../db/models/Product";
import Promotion from "../../../db/models/Promotion";
import User from "../../../db/models/User";

// Fs
import fs from "fs";
import path from "path";
// Token
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      url: string | string[];
    } | null;
    error: string | null;
  }>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }
  // Just after the "Method Not Allowed" code
  try {
    let { fields, files }: { fields: any; files: any } = await parseForm(req);
    await connectMongo();

    const token = await getToken({ req, secret });
    if (!token) {
      throw {
        error: "Невалиден токен!",
      };
    }
    const user = await User.findOne({ email: token.email });
    if (!user) {
      throw {
        error: "Невалиден акаунт",
      };
    }

    if (user.role != "admin") {
      throw {
        error: "Нямате такива права!",
      };
    }

    const uploadedImgData = files.article.newFilename;
    console.log(uploadedImgData);

    const { articleId, sectionId, imgUrl, itemId } = fields;
    console.log(articleId, imgUrl, itemId);

    const filePath = path.resolve(`public/uploads/${imgUrl}`);

    try {
      const search = fs.existsSync(filePath);

      if (search) {
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      console.log(e);
    }
    const newData = [{ originalname: uploadedImgData }];

    if (itemId) {
      const res = await Product.updateOne(
        { "subsection.items._id": itemId },
        {
          $set: {
            [`subsection.$[subSec].items.$[item].imageUrl`]: uploadedImgData,
          },
        },
        {
          arrayFilters: [
            { "subSec._id": { $eq: articleId } },
            { "item._id": { $eq: itemId } },
          ],
        }
      );
      console.log(res);
    }
    if (!itemId) {
      await Product.updateOne(
        { "subsection._id": articleId },
        { $set: { [`subsection.$[i].img`]: newData } },
        { arrayFilters: [{ "i._id": { $eq: articleId } }] }
      );

      await Promotion.updateOne(
        { "product.subsection._id": articleId },
        { $set: { "product.subsection.imgUrl": uploadedImgData } }
      );
    }

    let data: { message: string; error: any; data: any } = {
      message: "Успешно променихте снимката, рестарирайте страницата!",
      error: null,
      data: "Nqmna brat",
    };

    res.status(200).json(data);
  } catch (e) {
    if (e.error) {
      return res.status(400).json(e.error);
    }
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({
        data: null,
        error: "Сървърни проблеми, обадете се на телефон: 0876237725",
      });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
