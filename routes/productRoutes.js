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

router.post("/", async (req, res) => {

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

