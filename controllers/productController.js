const Product = require('../models/product');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;
  if (!nombre || !descripcion || !precio || !categoria || !stock || !imagen) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }
  const product = new Product({ nombre, descripcion, precio, categoria, stock, imagen });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    res.json({ message: 'Producto eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// para actualizar un producto, tuve muchos problemas con (servidor, base de datos, url)
//probe varias veces y no pude completar esa parte, se me complico.