"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
// Create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity } = req.body;
        const product = yield productModel_1.default.findById(productId);
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
        yield product.save();
        const order = new OrderModel_1.default(req.body);
        yield order.save();
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createOrder = createOrder;
// Retrieve all orders or filter by user email
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        let orders;
        if (email) {
            console.log(`Fetching orders for email: ${email}`);
            orders = yield OrderModel_1.default.find({ email });
            if (orders.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: `No orders found for email: ${email}`,
                });
            }
        }
        else {
            orders = yield OrderModel_1.default.find();
        }
        res.status(200).json({
            success: true,
            message: email
                ? `Orders fetched successfully for user email: ${email}`
                : "Orders fetched successfully!",
            data: orders,
        });
    }
    catch (error) {
        console.error(`Error fetching orders: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getAllOrders = getAllOrders;
// Retrieve a specific order by ID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield OrderModel_1.default.findById(req.params.orderId);
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getOrderById = getOrderById;
// Delete an order
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield OrderModel_1.default.findByIdAndDelete(req.params.orderId);
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.deleteOrder = deleteOrder;
