import express from "express";
import * as orderController from "../controllers/orderControllers";
import validate from "../middleware/validate";
import { orderSchema } from "../validators/orderValidation";

const router = express.Router();

// Order routes with validation middleware
router.post("/", validate(orderSchema), orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:orderId", orderController.getOrderById);
router.delete("/:orderId", orderController.deleteOrder);


export default router;
