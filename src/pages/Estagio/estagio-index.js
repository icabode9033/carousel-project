import { useState } from "react";
import { Link } from "react-router-dom";
import Theme from "../../components/Tema/tema";
import empresas from "../../components/empresas";
import RelatorioUC4 from "../../components/relatoriouc4";
import RelatorioUC7 from "../../components/relatoriouc7";
import RelatorioUC10 from "../../components/relatoriouc10";
import RelatorioUC17 from "../../components/relatoriouc17";
import ChecklistUC from "../../components/checklistuc";
import gerarPDF, { validarCamposParaPDF } from "../../assets/utils/pdfgenerator";
import "../Formulário/form-index.css";

const ucs = ["UC4", "UC7", "UC10", "UC17"];
const abas = ["Relatório", "Checklist"];

export default function FormularioEstagio() {
  const [ucSelecionada, setUcSelecionada] = useState("UC4");
  const [abaAtiva, setAbaAtiva] = useState("Relatório");
  const [empresaSelecionada, setEmpresaSelecionada] = useState("");
  const [dadosEmpresa, setDadosEmpresa] = useState({});
  const [dadosRelatorio, setDadosRelatorio] = useState({});
  const [dadosChecklist, setDadosChecklist] = useState({});

 const preencherEmpresa = (nome) => {
  const dados = empresas[nome] || {};
  setEmpresaSelecionada(nome);
  setDadosEmpresa({ ...dados, periodoEstagio: "" });
};

  const handleGerarPDF = () => {
    const erro = validarCamposParaPDF({
      uc: ucSelecionada,
      empresa: { nome: empresaSelecionada, ...dadosEmpresa },
      relatorio: dadosRelatorio,
      checklist: dadosChecklist,
      tipo: abaAtiva,
    });

    if (erro) {
      alert(`⚠️ ${erro}`);
      return;
    }

    gerarPDF({
      uc: ucSelecionada,
      empresa: { nome: empresaSelecionada, ...dadosEmpresa },
      relatorio: dadosRelatorio,
      checklist: dadosChecklist,
      tipo: abaAtiva,
    });
  };

  const renderRelatorioUC = () => {
    const props = {
      uc: ucSelecionada,
      dados: dadosRelatorio,
      setDados: setDadosRelatorio,
    };
    switch (ucSelecionada) {
      case "UC4":
        return <RelatorioUC4 {...props} />;
      case "UC7":
        return <RelatorioUC7 {...props} />;
      case "UC10":
        return <RelatorioUC10 {...props} />;
      case "UC17":
        return <RelatorioUC17 {...props} />;
      default:
        return null;
    }
  };

  return (
    <main className="extra">
      <div className="home-content-box">
        <div className="header-background">
         
        </div>

        <Theme />

        <div className="formulario-container">
          <h2 className="titulo">Formulário de Estágio Supervisionado</h2>

          <div className="form-grid">
            {/* Coluna esquerda - Empresas */}
            <div className="col-esquerda">
              <label><strong>Empresa afiliada:</strong></label>
              <select onChange={(e) => preencherEmpresa(e.target.value)}>
                <option value="">Selecione uma empresa</option>
                {Object.keys(empresas).map((nome, i) => (
                  <option key={i} value={nome}>{nome}</option>
                ))}
              </select>

              {empresaSelecionada && (
  <div className="info-empresa">
    <p><strong>RA:</strong> {dadosEmpresa.ra}</p>
    <p><strong>Polo:</strong> {dadosEmpresa.polo}</p>
    <p><strong>Período:</strong> {dadosEmpresa.periodo}</p>
    <p><strong>Ano Letivo:</strong> {dadosEmpresa.anoLetivo}</p>
    <p><strong>Setor:</strong> {dadosEmpresa.setor}</p>
    <p><strong>Info:</strong> {dadosEmpresa.info}</p>
    <p><strong>Plano:</strong> {dadosEmpresa.plano}</p>

    <label><strong>Período do Estágio:</strong></label>
    <input
      type="text"
      placeholder="Ex: 05/08/2024 a 06/09/2024"
      value={dadosEmpresa.periodoEstagio || ""}
      onChange={(e) =>
        setDadosEmpresa({ ...dadosEmpresa, periodoEstagio: e.target.value })
      }
    />
  </div>
)}
 </div>
            {/* Coluna direita - UC + Abas */}
            <div className="col-direita">
              <div className="uc-tabs">
                {ucs.map((uc) => (
                  <button
                    key={uc}
                    onClick={() => setUcSelecionada(uc)}
                    className={ucSelecionada === uc ? "ativo" : ""}
                  >
                    {uc}
                  </button>
                ))}
              </div>

              <div className="aba-tabs">
                {abas.map((aba) => (
                  <button
                    key={aba}
                    onClick={() => setAbaAtiva(aba)}
                    className={abaAtiva === aba ? "ativo" : ""}
                  >
                    {aba}
                  </button>
                ))}
              </div>

              <div className="aba-conteudo">
                {abaAtiva === "Relatório" ? (
                  renderRelatorioUC()
                ) : (
                  <ChecklistUC
                    uc={ucSelecionada}
                    dados={dadosChecklist}
                    setDados={setDadosChecklist}
                  />
                )}
              </div>

              <button className="btn-enviar" onClick={handleGerarPDF}>
                Salvar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
