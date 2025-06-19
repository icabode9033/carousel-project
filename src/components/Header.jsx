import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import '../assets/css/style.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/aos/aos.css';
import '../assets/vendor/glightbox/css/glightbox.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/swiper/swiper-bundle.min.css';

import icon from '../assets/img/icon.png';

const Header = () => {
  return (
    <header id="header" className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <img src={icon} alt="Logo Enfermagem" />
          <span> </span>
        </Link>

        <nav id="navbar" className="navbar">
          <ul>
            <li><Link className="nav-link scrollto active" to="/">Início</Link></li>
            <li><Link className="nav-link scrollto" to="/glossario">Glossário</Link></li>
            <li><Link className="nav-link scrollto" to="/calculo">Calculo</Link></li>
            <li><Link className="nav-link scrollto" to="/formulario">Formulário</Link></li>
            <li><Link className="nav-link scrollto" to="/estagio">Estagio</Link></li>
            <li><Link className="nav-link scrollto" to="/quiz">Quiz</Link></li>
            <li><Link className="getstarted scrollto" to="/sobre">sobre</Link></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
    
  );
};

export default Header;



