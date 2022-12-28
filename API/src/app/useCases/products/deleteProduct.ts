import { Request, Response } from "express";

import { Product } from "../../models/Product";

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    console.log("LOG  deleteProduct  productId", productId);

    const product = await Product.findByIdAndDelete(productId);
    console.log("LOG  deleteProduct  product", product);

    if (!product) {
      return res.status(400).json({
        error: "Ordem não encontrada.",
      });
    }

    res.status(204).json();
  } catch (error) {
    res.sendStatus(500);
  }
}
