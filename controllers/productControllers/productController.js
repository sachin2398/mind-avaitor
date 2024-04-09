// controllers/productController.js
const Product = require("../../models/product");

// Controller function to get all products
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// controllers/productController.js

// Controller function to get all products
const getAllProducts = async (req, res) => {
    try {
        const { sortBy, titleFilter, priceFilter, searchText, page = 1, limit = 10 } = req.query;
        let sortQuery = {};
        let filterQuery = {};
        let searchQuery = {};

        // Sorting
        if (sortBy === 'userPrice') {
            sortQuery = { price: 1 }; // Sort by userPrice in ascending order
        } else if (sortBy === 'title') {
            sortQuery = { title: 1 }; // Sort by title in ascending order
        } else {
            sortQuery = { createdAt: -1 }; // Default sort by createdAt in descending order
        }

        // Filtering by title
        if (titleFilter && titleFilter !== '') {
            filterQuery.title = { $regex: titleFilter, $options: 'i' }; // Case-insensitive regex search by title
        }

        // Filtering by price
        if (priceFilter && priceFilter !== '') {
            filterQuery.price = priceFilter; // Exact match search by price
        }

        // Text search
        if (searchText && searchText !== '') {
            searchQuery = {
                $or: [
                    { title: { $regex: searchText, $options: 'i' } }, // Case-insensitive regex search by title
                    { description: { $regex: searchText, $options: 'i' } } // Case-insensitive regex search by description
                ]
            };
        }

        // Pagination
        const skip = (page - 1) * limit;

        // Query products with sorting, filtering, searching, and pagination
        const products = await Product.find({ $and: [filterQuery, searchQuery] })
            .sort(sortQuery)
            .skip(skip)
            .limit(parseInt(limit)); // Convert limit to integer

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller function to add a new product
const addProduct = async (req, res) => {
  try {
    const { title, authorName, price, description, publication } = req.body;
    const product = new Product({
      title,
      authorName,
      price,
      description,
      publication,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, authorName, price, description, publication } = req.body;
    await Product.findByIdAndUpdate(id, {
      title,
      authorName,
      price,
      description,
      publication,
    });
    res.json({ message: `Product with ID ${id} updated successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: `Product with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllProducts,getProductById, addProduct, updateProduct, deleteProduct };
