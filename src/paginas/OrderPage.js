
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productosStorage = localStorage.getItem('carrito');
    if (productosStorage) {
      const productosArray = JSON.parse(productosStorage);
      setProductos(productosArray);
      const totalCalculado = productosArray.reduce((acum, producto) => acum + producto.precio * (producto.cantidad || 1), 0);
      setTotal(totalCalculado);
    }
  }, []);

  const handleConfirmOrder = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/orders', { productos, total });
      console.log('Pedido confirmado:', res.data);
    } catch (error) {
      console.error('Error al confirmar el pedido:', error);
    }
  };

  return (
    <div>
      <h1>Resumen del Pedido</h1>
      <ul>
        {productos.map((producto, index) => (
          <li key={index}>
            {producto.nombre} - ${producto.precio} x {producto.cantidad || 1}
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleConfirmOrder}>Confirmar Pedido</button>
    </div>
  );
};

export default OrderPage;
