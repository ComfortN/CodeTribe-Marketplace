import Product from '../models/products.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const { category, available, minPrice, maxPrice } = req.query;
    let query = { hidden: false };

    if (category) query.category = category;
    if (available !== undefined) query.available = available === 'true';
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).populate('seller', 'username');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stock } = req.body;
    const product = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      seller: req.user.userId,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

