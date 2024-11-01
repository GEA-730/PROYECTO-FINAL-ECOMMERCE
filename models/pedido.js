const Pedido = require('../models/pedido');

exports.createOrder = async (req, res) => {
  const nuevoPedido = new Pedido({
    productos: req.body.productos,
    total: req.body.total
  });
  try {
    const pedido = await nuevoPedido.save();
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
 