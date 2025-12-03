import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${searchTerm}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <span>🌵</span> Cactus Haven
        </Link>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <nav className="nav">
          <Link to="/shop">Shop</Link>
          <Link to="/cactus-info">Cactus Info</Link>
          <Link to="/succulent-info">Succulent Info</Link>
          <Link to="/accessories">Accessories</Link>
          
          {isAuthenticated ? (
            <div className="user-menu">
              <span>Hi, {user?.name}</span>
              <Link to="/cart">Cart</Link>
              <Link to="/wishlist">Wishlist</Link>
              {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;