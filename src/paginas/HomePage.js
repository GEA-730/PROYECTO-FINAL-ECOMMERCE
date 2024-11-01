import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import Modal from 'react-modal';
import Carrito from '../componentes/Carrito';
import OrderSummary from '../componentes/ordersummary';
import Confirmation from '../componentes/Confirmation';
import './HomePage.css';

Modal.setAppElement('#root');

function HomePage({ cart, addToCart, removeFromCart }) {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todas');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [summaryIsOpen, setSummaryIsOpen] = useState(false);
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);
  const categorias = ['Todas', 'Alcoholicas', 'Gaseosas', 'Energizantes', 'Jugos Refrescos'];

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/productos');
        setProductos(res.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    fetchProductos();
  }, []);

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const procederCompra = () => {
    setSummaryIsOpen(true);
  };

  const cerrarResumen = () => {
    setSummaryIsOpen(false);
  };

  const confirmarCompra = () => {
    setSummaryIsOpen(false);
    setConfirmationIsOpen(true);
  };

  const cerrarConfirmacion = () => {
    setConfirmationIsOpen(false);
  };

  const total = cart.reduce((sum, producto) => sum + producto.precio * (producto.cantidad || 1), 0);

  const productosFiltrados = categoria === 'Todas'
    ? productos
    : productos.filter(producto => producto.categoria === categoria);

  return (
    <div className="container">
      <div className="header">
        <h1>Productos</h1>
        <div className="cart-icon" onClick={() => setModalIsOpen(true)}>
          <FaShoppingCart size={30} />
          {cart.length > 0 && (
            <div className="cart-icon-badge">{cart.length}</div> 
          )}
        </div>
      </div>
      <label className="categoria-label">
        Categoría:
        <select className="select-button" value={categoria} onChange={handleCategoriaChange}>
          {categorias.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </label>
      <div className="product-list">
        {productosFiltrados.map(producto => (
          <div key={producto._id} className="product-card">
            <img src={producto.imagen} alt={producto.nombre} className="product-image" />
            <div className="product-details">
              <h2>{producto.nombre}</h2>
              <p className="category">{producto.categoria}</p>
              <p>Descripción: {producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
              <p>Stock: {producto.stock}</p>
              <button className="add-to-cart-button" onClick={() => addToCart(producto)}>Añadir al Carrito</button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Carrito de Compras">
        <Carrito productos={cart} eliminarProducto={removeFromCart} procederCompra={procederCompra} />
        <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
      <Modal isOpen={summaryIsOpen} onRequestClose={cerrarResumen} contentLabel="Resumen del Pedido">
        <OrderSummary productos={cart} total={total} cerrarResumen={cerrarResumen} confirmarCompra={confirmarCompra} />
      </Modal>
      <Modal isOpen={confirmationIsOpen} onRequestClose={cerrarConfirmacion} contentLabel="Pedido Confirmado">
        <Confirmation cerrarConfirmacion={cerrarConfirmacion} />
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

// sufri mucho con la base de datos y la actualizacion de productos
//no es excusa, no pude terminar
