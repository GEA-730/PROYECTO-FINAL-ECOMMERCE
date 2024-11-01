import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/productos/${id}`);
        setProducto(res.data);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    fetchProducto();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(producto);
  };

  return (
    <div>
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>
      <p>Precio: {producto.precio}</p>
      <p>Stock: {producto.stock}</p>
      <button onClick={handleAddToCart}>Añadir al Carrito</button>
    </div>
  );
}

export default ProductDetailPage;
