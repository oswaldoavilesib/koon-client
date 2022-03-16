import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";
import { isValidObjectId } from "mongoose";

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "PUT":
      return updateProduct(req, res);

    case "POST":
      return createProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const products = await Product.find().sort({ title: "asc" }).lean();

  await db.disconnect();

  //TODO: ACTUALIZAR LAS IMAGENES CUANDO LAS SOLICITEMOS (NO VAN A ESTAR ALOJADAS EN NUESTRO SERVIDOR DE NEXT)

  res.status(200).json(products);
};
const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "El ID del produto no es válido" });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "Es necesario adjuntar 2 imágenes." });
  }

  //TODO: Posiblemente tendremos un localhost:3000/products/adsfasdf.jpg

  try {
    await db.connect();

    const product = await Product.findById(_id);

    if (!product) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "No existe un producto con ese ID" });
    }

    //TODO: Eliminar fotos en Cloudinary

    await product.update(req.body);

    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "El producto necesita tener al menos 2 imágenes. " });
  }

  //TODO: prevenir la url del local host:3000/products

  try {
    await db.connect();
    const productInDb = await Product.findOne({ slug: req.body.slug });

    if (!productInDb) {
      await db.disconnect();

      return res
        .status(400)
        .json({ message: "YA existe un producto con ese slug" });
    }

    const product = new Product(req.body);
    await productInDb.save()

    await db.disconnect();

    res.status(200).json(product)

  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar logs del servidor" });
  }
};
