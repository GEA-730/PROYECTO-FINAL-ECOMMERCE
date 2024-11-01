import React from 'react';

const Carrito = ({ productos, eliminarProducto, procederCompra }) => {
  const total = productos.reduce((sum, producto) => sum + producto.precio * (producto.cantidad || 1), 0);

  return (
    <div className="carrito">
      <h2>Carrito de Compras</h2>
      <ul>
        {productos.map((producto, index) => (
          <li key={index}>
            {producto.nombre} - ${producto.precio} x {producto.cantidad || 1}
            <button onClick={() => eliminarProducto(producto._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={procederCompra} className="confirm-button">Proceder a la Compra</button>
    </div>
  );
};

export default Carrito;

