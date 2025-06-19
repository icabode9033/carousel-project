import { useState } from "react";
import { Link } from "react-router-dom";
import Theme from "../../components/Tema/tema";
import "../Calculo/calc-index.css";
import medicamentos from '../../components/remedios';

export default function Penicilina() {
    const [peso, setPeso] = useState("");
    const [diasDesejados, setDiasDesejados] = useState("");
    const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [historico, setHistorico] = useState([]);

    const calcular = () => {
        if (!peso || !diasDesejados || !medicamentoSelecionado) return;

        const pesoFloat = parseFloat(peso);
        const dias = parseInt(diasDesejados);

        const doseMg = medicamentoSelecionado.dosePorKg * pesoFloat;
        const volumePorDose = doseMg / medicamentoSelecionado.concentracao;
        const totalDosesPossiveis = medicamentoSelecionado.quantidade / volumePorDose;
        const dosesPorDiaCalculadas = totalDosesPossiveis / dias;

        const novoResultado = {
            doseMg: doseMg.toFixed(2),
            volumePorDose: volumePorDose.toFixed(2),
            totalDosesPossiveis: totalDosesPossiveis.toFixed(1),
            dosesPorDia: dosesPorDiaCalculadas.toFixed(2),
            dias,
            medicamento: medicamentoSelecionado.nome,
            peso,
            data: new Date().toLocaleString()
        };

        setResultado(novoResultado);
        setHistorico(prev => [novoResultado, ...prev].slice(0, 10));
    };

    const limparHistorico = () => {
        setHistorico([]);
    };

    return (
        <div className="home-content-box">
            
            
                    <Theme />

            <div className="main-content-wrapper">
                <div className="calculadora-container">
                    <div className='calculo'>
                        <h2>Calculadora</h2>

                        <label>
                            Peso do paciente (kg):
                            <input
                                type="number"
                                value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                            />
                        </label>

                        <br />

                        <label>
                            Duração desejada do tratamento (dias):
                            <input
                            placeholder="Ex: 7"
                                type="number"
                                value={diasDesejados}
                                onChange={(e) => setDiasDesejados(e.target.value)}
                            />
                        </label>

                        <br />

                        <label>
                            Escolha o medicamento:
                            <select
                                onChange={(e) => 
                                    setMedicamentoSelecionado(
                                        medicamentos.find((m) => m.nome === e.target.value)
                                    )
                                }
                            >
                                <option value="">Selecione</option>
                                {medicamentos.map((m) => (
                                    <option key={m.nome} value={m.nome}>
                                        {m.nome}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <br />
                        <button onClick={calcular}>Calcular</button>

                        {resultado && (
                            <div className="resultado-container">
                                <h3>Resultado</h3>
                                <p>Medicamento: {resultado.medicamento}</p>
                                <p>Peso do paciente: {resultado.peso} kg</p>
                                <p>Dose por administração: {resultado.doseMg} mg</p> 
                                <p>Volume por dose: {resultado.volumePorDose} ml</p>
                                <p>Total de doses possíveis: {resultado.totalDosesPossiveis}</p>
                                <p className="dose-final">
                                    <strong>
                                        Deve tomar {resultado.dosesPorDia} vezes por dia por {resultado.dias} dias
                                    </strong>
                                </p>
                                <p className="data-calculo">Cálculo realizado em: {resultado.data}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="historico-sidebar">
                    <div className="historico-header">
                        <h3>Histórico de Cálculos</h3>
                        {historico.length > 0 && (
                            <button onClick={limparHistorico} className="limpar-historico">
                                Limpar
                            </button>
                        )}
                    </div>
                    
                    {historico.length > 0 ? (
                        <div className="historico-lista">
                            {historico.map((item, index) => (
                                <div key={index} className="historico-item" onClick={() => {
                                    setResultado(item);
                                    window.scrollTo({top: 0, behavior: 'smooth'});
                                }}>
                                    <p><strong>{item.medicamento}</strong></p>
                                    <p>{item.peso} kg • {item.dosesPorDia}x/dia</p>
                                    <p className="historico-data">{item.data}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="historico-vazio">
                            <p>Nenhum cálculo no histórico</p>
                            <p>Realize cálculos para vê-los aqui</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}