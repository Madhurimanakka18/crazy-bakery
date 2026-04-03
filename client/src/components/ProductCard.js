import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    setAdding(true);
    addToCart(product);
    toast.success(`🛒 ${product.name} added!`, { autoClose: 1500 });
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400' : product.image_url}
          alt={product.name}
          onError={() => setImgError(true)}
          className="product-img"
          loading="lazy"
        />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          <button
            className={`add-btn ${adding ? 'adding' : ''}`}
            onClick={handleAdd}
          >
            {adding ? '✓' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
