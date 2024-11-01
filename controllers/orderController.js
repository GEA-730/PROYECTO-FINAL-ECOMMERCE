const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  const { productos, total } = req.body;
  if (!productos || productos.length === 0) {
    return res.status(400).json({ message: 'No hay productos en el pedido.' });
  }
  const order = new Order({ productos, total });
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('productos.producto');
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado.' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
