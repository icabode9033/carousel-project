import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import Carousel from './components/Carousel';

import Home from "./pages/Home/index.js";
import Glossario from "./pages/Glossário/gloss-index";
import Calculo from "./pages/Calculo/calc-index.js";
import Formulario from "./pages/Formulário/form-index";
import Estagio from "./pages/Estagio/estagio-index";
import Quiz from "./pages/Quiz/quiz-index";
import Sobre from "./pages/Sobre/sobre-index.js";

import './components/Navbar.css';

function App() {
  return (
    <>
      <div className="bg-slate-900 fixed w-full z-10">
        <Header />
      </div>

      <div className="App mt-32 p-4 text-white bg-slate-800 min-h-screen">
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/glossario" element={<Glossario />} />
         <Route path="/calculo" element={<Calculo />} />
         <Route path="/formulario" element={<Formulario />} />
         <Route path="/estagio" element={<Estagio />} />
         <Route path="/quiz" element={<Quiz />} />
         <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
