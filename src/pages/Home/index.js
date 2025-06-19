import { useEffect, useState } from "react";
import "../Home/index.css";
import Theme from "../../components/Tema/tema";

import Amoxicilina_clavulanato from '../../assets/Images/Amoxicilina_clavulanato.png';
import Amoxilina from '../../assets/Images/Amoxilina.png';
import Amoxilina_xr from '../../assets/Images/Amoxilina_xr.png';
import Amoxilinap from '../../assets/Images/Amoxilinap.png';
import Dipirona from '../../assets/Images/Dipirona.png';
import Dipirona_comprimidas from '../../assets/Images/Dipirona_comprimidas.png';
import Dipirona_sodica from '../../assets/Images/Dipirona_sodica.png';
import Dipirona_solucao from '../../assets/Images/Dipirona_solucao.png';
import Ibuprofeno_infantil from '../../assets/Images/Ibuprofeno_infantil.png';
import Iboprofeno_xr from '../../assets/Images/Iboprofeno_xr.png';
import Ibuprofeno from '../../assets/Images/Ibuprofeno.png';
import Ibuprofeno_gel from '../../assets/Images/Ibuprofeno_gel.png';
import Ibuproveno_comprimidos from '../../assets/Images/Ibuproveno_comprimidos.png';
import Metaformina_xrpius from '../../assets/Images/Metaformina_xrpius.png';
import Metformina_xr from '../../assets/Images/Metformina_xr.png';
import Metforminap from '../../assets/Images/Metforminap.png';
import Metiformina from '../../assets/Images/Metiformina.png';
import Omeprazol from '../../assets/Images/Omeprazol.png';
import Omeprazol_capsulas from '../../assets/Images/Omeprazol_capsulas.png';
import Omeprazol_dr from '../../assets/Images/Omeprazol_dr.png';
import Omeprazol_infantil from '../../assets/Images/Omeprazol_infantil.png';
import Paracetamol_plus from '../../assets/Images/Paracetamol_plus.png';
import Paracetamol from '../../assets/Images/Paracetamol.png';
import Paracetamol_solucao from '../../assets/Images/Paracetamol_solucao.png';
import Paracetamol_infantil from '../../assets/Images/Paracetamol_infantil.png';

const Home = () => {
    const medicamentos = [
        Amoxicilina_clavulanato, Amoxilina, Amoxilina_xr, Amoxilinap,
        Dipirona, Dipirona_comprimidas, Dipirona_sodica, Dipirona_solucao,
        Ibuprofeno_infantil, Iboprofeno_xr, Ibuprofeno, Ibuprofeno_gel, Ibuproveno_comprimidos,
        Metaformina_xrpius, Metformina_xr, Metforminap, Metiformina,
        Omeprazol, Omeprazol_capsulas, Omeprazol_dr, Omeprazol_infantil,
        Paracetamol_plus, Paracetamol, Paracetamol_solucao, Paracetamol_infantil
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % medicamentos.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [medicamentos.length]);

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + medicamentos.length) % medicamentos.length);
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % medicamentos.length);
    };

    const getItemClass = (i) => {
        const length = medicamentos.length;
        const relativeIndex = (i - index + length) % length;

        if (relativeIndex === 0) return "item center";
        if (relativeIndex === 1) return "item right-1";
        if (relativeIndex === 2) return "item right-2";
        if (relativeIndex === length - 1) return "item left-1";
        if (relativeIndex === length - 2) return "item left-2";
        return "item hidden";
    };

    return (
        <main className="home">
            <div className='home-content-box'>
                <div className="header-background"></div>

                <Theme />

                <div className="carousel-container">
                    <button className="carousel-button prev" onClick={handlePrev}>
                        &lt;
                    </button>

                    <div className="carousel-track">
                        {medicamentos.map((med, i) => (
                            <div key={i} className={getItemClass(i)}>
                                <img src={med} alt={`Medicamento ${i}`} className="med-image" />
                            </div>
                        ))}
                    </div>

                    <button className="carousel-button next" onClick={handleNext}>
                        &gt;
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Home;
