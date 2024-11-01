import React, { useState, useEffect } from 'react';
import Carrito from '../componentes/Carrito';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const productosStorage = localStorage.getItem('carrito');
    if (productosStorage) {
      setProductos(JSON.parse(productosStorage));
    }
  }, []);

  useEffect(() => {
    const totalCalculado = productos.reduce((acum, producto) => acum + producto.precio, 0);
    setTotal(totalCalculado);
  }, [productos]);

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((producto) => producto._id !== id);
    setProductos(nuevosProductos);
    localStorage.setItem('carrito', JSON.stringify(nuevosProductos));
  };

  const handleProceedToOrder = () => {
    navigate('/order');
  };

  return (
    <div>
      <h1>Página de carrito</h1>
      <Carrito
        productos={productos}
        total={total}
        eliminarProducto={eliminarProducto}
      />
      <button onClick={handleProceedToOrder}>Proceder al Pedido</button>
    </div>
  );
};

export default CartPage;


