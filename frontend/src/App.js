import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Header from './components/common/Header';

// Pages
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Styles
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Add more routes as we create components */}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;