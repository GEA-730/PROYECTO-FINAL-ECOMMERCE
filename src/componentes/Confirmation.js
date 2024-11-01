import React from 'react';

const Confirmation = ({ cerrarConfirmacion }) => {
  return (
    <div className="confirmation">
      <h2>Pedido Confirmado</h2>
      <p>Su pedido está en camino.</p>
      <button onClick={cerrarConfirmacion}>Cerrar</button>
    </div>
  );
};

export default Confirmation;
