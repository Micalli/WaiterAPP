import { Router } from "express";
import path from "node:path";

import multer from "multer";

import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategories";
import { listListOrder } from "./app/useCases/order/listOrders";
import { createOrder } from "./app/useCases/order/createOrder";
import { changeOrderStatus } from "./app/useCases/order/changeOrder";
import { deleteOrder } from "./app/useCases/order/deleteOrder";
import { deleteProduct } from "./app/useCases/products/deleteProduct";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get("/categories", listCategories);

// Create category
router.post("/categories", createCategory);

// List products
router.get("/products", listProducts);

// Create products
router.post("/products", upload.single("image"), createProduct);

// Delete product
router.delete("/productsss/:productId", deleteProduct);

// Get products by category
router.get("/categories/:categoryId/products", listProductsByCategory);

// List orders
router.get("/orders", listListOrder);

// Create order
router.post("/orders", createOrder);

// Change order status
router.patch("/orders/:orderId", changeOrderStatus);

// Delete order
router.delete("/orders/:orderId", deleteOrder);
