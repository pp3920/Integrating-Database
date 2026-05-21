const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

/**
 * POST /api/products (Create a Product)

Creates a new product based on the req.body.
Responds with the newly created product and a 201 status code.
If validation fails, it should return a 400 status code with a descriptive error message.

 */

router.post("/api/products", async (req, res) => {

    try {

        const newProd = await Product.create(req.body);
        res.status(201).json(newProd);
    }
    catch (error) {
        res.status(400).json({ error: error.message });

    }
});

/*GET /api/products/:id (Read a Single Product)

Retrieves a single product by its _id.
If the product is found, responds with the product object.
If no product is found, responds with a 404 status code. */

router.get("api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/*
PUT /api/products/:id (Update a Product)

Updates a product by its _id with the data from req.body.
Responds with the updated product data (use the { new: true } option).
If no product is found to update, responds with a 404 status code.

*/

router.put("api/products/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("api/products/:id", async (req, res) => {
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;