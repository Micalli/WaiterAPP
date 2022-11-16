import { Request, Response } from "express";

import { Order } from "../../models/Order";

export async function deleteOrder(req: Request, res: Response) {
  try {
    const { orderId } = req.params;

    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(400).json({
        error: "Ordem não encontrada.",
      });
    }

    res.status(204).json();
  } catch (error) {
    res.sendStatus(500);
  }
}
