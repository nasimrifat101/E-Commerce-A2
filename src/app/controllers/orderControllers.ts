import { Request, Response } from "express";
import Order from "../models/OrderModel";
import Product from "../models/productModel";

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (error: Error | any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all orders or filter by user email
export const getAllOrders = async (req: Request, res: Response) => {
    try {
      const email = req.query.email as string;
      let orders;
  
      if (email) {
        console.log(`Fetching orders for email: ${email}`);
        orders = await Order.find({ email });
        if (orders.length === 0) {
          return res.status(404).json({
            success: false,
            message: `No orders found for email: ${email}`,
          });
        }
      } else {
        orders = await Order.find();
      }
  
      res.status(200).json({
        success: true,
        message: email
          ? `Orders fetched successfully for user email: ${email}`
          : "Orders fetched successfully!",
        data: orders,
      });
    } catch (error: Error | any) {
      console.error(`Error fetching orders: ${error.message}`);
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Retrieve a specific order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: order,
    });
  } catch (error: Error | any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Order deleted successfully!",
      data: null,
    });
  } catch (error: Error | any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
