import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";

const apiRoute = createRouter<NextApiRequest, NextApiResponse>();

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});
apiRoute.use(upload.any());

apiRoute.post((req: NextApiRequest, res: NextApiResponse) => {
  // const data = JSON.parse(JSON.stringify(req.body));
  // console.log(data);

  console.log(req.body.articles, req["file"]);

  res.json({ data: "success" });
});

export default apiRoute.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
