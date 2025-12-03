import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getAll({ limit: 6 });
        setFeaturedProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Cactus Haven</h1>
          <p>Your premier destination for beautiful cacti, succulents, and plant accessories</p>
          <Link to="/shop" className="cta-button">Shop Now</Link>
        </div>
        <div className="hero-image">
          <span className="hero-emoji">🌵</span>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            <Link to="/shop?category=cactus" className="category-card">
              <span className="category-icon">🌵</span>
              <h3>Cacti</h3>
              <p>Desert beauties that thrive with minimal care</p>
            </Link>
            <Link to="/shop?category=succulent" className="category-card">
              <span className="category-icon">🌿</span>
              <h3>Succulents</h3>
              <p>Fleshy plants perfect for any space</p>
            </Link>
            <Link to="/shop?category=accessories" className="category-card">
              <span className="category-icon">🪴</span>
              <h3>Accessories</h3>
              <p>Pots, tools, and care essentials</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <div className="placeholder-image">🌱</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price}</p>
                    <Link to={`/product/${product._id}`} className="view-button">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="container">
          <h2>Why Choose Cactus Haven?</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>🚚 Free Shipping</h3>
              <p>Free delivery on orders over $50</p>
            </div>
            <div className="info-card">
              <h3>🌱 Expert Care</h3>
              <p>Detailed care instructions with every plant</p>
            </div>
            <div className="info-card">
              <h3>💚 Healthy Plants</h3>
              <p>Hand-selected, healthy plants guaranteed</p>
            </div>
            <div className="info-card">
              <h3>📞 Support</h3>
              <p>Expert plant care support available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;