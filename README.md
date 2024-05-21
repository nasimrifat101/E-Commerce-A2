# E-Commerce API

This project is an E-Commerce API built with Node.js, Express, MongoDB and Mongoose. It allows users to manage products and orders with CRUD operations and provides functionalities such as searching for products and filtering orders by user email.

#### Production API endpoint for testing
- https://assignment-2-nine-azure.vercel.app/api/products
- https://assignment-2-nine-azure.vercel.app/api/orders

## Features

- CRUD operations for products and orders
- Search products by name
- Filter orders by user email

## Endpoints

### Products

- **Create a Product**
  - **URL:** `/api/products`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "name": "iPhone 13",
      "description": "A sleek and powerful smartphone with cutting-edge features.",
      "price": 999,
      "category": "Electronics",
      "tags": ["smartphone", "Apple", "iOS"],
      "variants": [
        {
          "type": "Color",
          "value": "Midnight Blue"
        },
        {
          "type": "Storage Capacity",
          "value": "256GB"
        }
      ],
      "inventory": {
        "quantity": 50,
        "inStock": true
      }
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Product created successfully!",
      "data": { ... }
    }
    ```

- **Get All Products**
  - **URL:** `/api/products`
  - **Method:** `GET`
  - **Query Parameters:**
    - `searchTerm` (optional) - Search for products by name
    - **URL:** `/api/products?searchTerm=iphone`
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Products fetched successfully!",
      "data": [ ... ]
    }
    ```

- **Get a Product by ID**
  - **URL:** `/api/products/:productId`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Product fetched successfully!",
      "data": { ... }
    }
    ```

- **Update a Product**
  - **URL:** `/api/products/:productId`
  - **Method:** `PUT`
  - **Request Body:** (same as creating a product)
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Product updated successfully!",
      "data": { ... }
    }
    ```

- **Delete a Product**
  - **URL:** `/api/products/:productId`
  - **Method:** `DELETE`
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Product deleted successfully!",
      "data": null
    }
    ```

### Orders

- **NOTE**
  - Need a valid id from product list for order to be placed.

- **Get All Orders**
  - **URL:** `/api/orders`
  - **Method:** `GET`
  - **Query Parameters:**
    - `email` (optional) - Filter orders by user email
    - **URL:** `/api/orders?email=level2@programming-hero.com`
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Orders fetched successfully!",
      "data": [ ... ]
    }
    ```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/e-commerce-api.git
   cd e-commerce-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - Ensure you have MongoDB installed and running on your machine.
   - Create a `.env` file in the root directory and add your MongoDB connection string:
     ```
     MONGO_URI=mongodb://localhost:27017/yourdbname
     PORT = 5000
     ```

4. **Run the server:**
   ```bash
   ts-node-dev --respawn --transpile-only src/server.ts
   ```

5. **Access the API:**
   - The API will be running on `http://localhost:5000`.

## Usage

You can use tools like [Postman](https://www.postman.com/) to interact with the API endpoints.

---
