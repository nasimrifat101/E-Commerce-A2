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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
// Create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new productModel_1.default(req.body);
        yield product.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createProduct = createProduct;
// Retrieve all products or search by term
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        let products;
        if (searchTerm) {
            console.log(`Searching for products with term: ${searchTerm}`);
            products = yield productModel_1.default.find({ name: new RegExp(searchTerm, "i") });
        }
        else {
            products = yield productModel_1.default.find();
        }
        res.status(200).json({
            success: true,
            message: searchTerm
                ? `Products matching search term '${searchTerm}' fetched successfully!`
                : "Products fetched successfully!",
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getAllProducts = getAllProducts;
// Retrieve a specific product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findById(req.params.productId);
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getProductById = getProductById;
// Update product information
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true });
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateProduct = updateProduct;
// Delete a product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findByIdAndDelete(req.params.productId);
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.deleteProduct = deleteProduct;
