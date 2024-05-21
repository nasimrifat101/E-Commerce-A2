import express from "express";
import * as productController from "../controllers/ProductControllers";
import validate from "../middleware/validate";
import { productSchema } from "../validators/productValidation";

const router = express.Router();

router.post("/", validate(productSchema), productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.put(
  "/:productId",
  validate(productSchema),
  productController.updateProduct
);
router.delete("/:productId", productController.deleteProduct);

export default router;
