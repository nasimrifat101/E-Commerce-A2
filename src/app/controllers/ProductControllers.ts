import { Request, Response } from "express";
import Product from "../models/productModel";

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: product,
    });
  } catch (error: Error | any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all products or search by term
export const getAllProducts = async (req: Request, res: Response) => {
    try {
      const searchTerm = req.query.searchTerm as string;
      let products;
  
      if (searchTerm) {
        console.log(`Searching for products with term: ${searchTerm}`);
        products = await Product.find({ name: new RegExp(searchTerm, "i") });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json({
        success: true,
        message: searchTerm
          ? `Products matching search term '${searchTerm}' fetched successfully!`
          : "Products fetched successfully!",
        data: products,
      });
    } catch (error: Error | any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Retrieve a specific product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: product,
    });
  } catch (error: Error | any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product information
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: product,
    });
  } catch (error: Error | any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error: Error | any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


