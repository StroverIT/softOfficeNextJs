import { connectMongo } from "../../../db/connectDb";
import mongoose from "mongoose";

import Product from "../../../db/models/Product";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const data = req.body;
  console.log(data, token);
}
