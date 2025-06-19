import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';

import React from 'react';
import './Navbar.css'; // Certifique-se de criar esse arquivo

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><a href="#inicio">Início</a></li>
        <li><a href="#novidades">Glossario</a></li>
        <li><a href="#masculino">Calculadora</a></li>
        <li><a href="#feminino">Formulario</a></li>
        <li><a href="#kids">Quiz</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;