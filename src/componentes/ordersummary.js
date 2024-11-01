import React from 'react';

const OrderSummary = ({ productos, total, cerrarResumen, confirmarCompra }) => {
  return (
    <div className="order-summary">
      <h2>Resumen del Pedido</h2>
      <ul>
        {productos.map((producto, index) => (
          <li key={index}>
            {producto.nombre} - ${producto.precio} x {producto.cantidad || 1}
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={confirmarCompra} className="confirm-button">Confirmar Compra</button>
      <button onClick={cerrarResumen}>Cerrar</button>
    </div>
  );
};

export default OrderSummary;
