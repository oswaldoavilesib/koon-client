import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "../../../interfaces";
import Product from "../../../models/Product";
import { db, SHOP_CONSTANTS } from "../../../database";

type Data = { message: string } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {gender = 'all'} = req.query;
    const {type = 'all'} = req.query;

    let condition = {}
    if(gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)){

      condition = {gender};
    }

    if(type !== 'all' && SHOP_CONSTANTS.validTypes.includes(`${type}`)){
      condition={type}
    }


  await db.connect();
  const products = await Product
  .find(condition)
  .select('title images price inStock slug -_id')
  .lean();

  await db.disconnect();

  return res.status(200).json(products);
};
