import { useState } from "react";
import { Link } from "react-router-dom";
import "./estagio-index.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import Theme from "../../components/Tema/tema";
import logo from "../../assets/Images/senac-logo.png";

const campos = [
  "Nome",
  "RA",
  "Polo",
  "Período do Estágio",
  "Ano Letivo",
  "Empresa Concedente",
  "Setor de realização do estágio",
  "Informações sobre a empresa",
  "Plano de Ação"
];

const empresas = {
  "Tech Solutions S/A": {
    ra: "2025001",
    polo: "Belo Horizonte",
    periodo: "1º semestre de 2025",
    anoLetivo: "2025",
    setor: "Tecnologia da Informação",
    info: "Empresa focada em desenvolvimento de software corporativo.",
    plano: "Desenvolvimento de um sistema de controle de estoque."
  },
  "Contábil Mais Ltda": {
    ra: "2025002",
    polo: "Montes Claros",
    periodo: "2º semestre de 2025",
    anoLetivo: "2025",
    setor: "Departamento Fiscal",
    info: "Escritório contábil com foco em pequenas empresas.",
    plano: "Análise de processos contábeis e lançamento de notas fiscais."
  },
  "EcoGestão Ambiental": {
    ra: "2025003",
    polo: "Uberlândia",
    periodo: "1º semestre de 2025",
    anoLetivo: "2025",
    setor: "Licenciamento Ambiental",
    info: "Consultoria especializada em gestão ambiental.",
    plano: "Auxílio na elaboração de relatórios de impacto ambiental."
  }
};

export default function Formulario() {
  const [respostas, setRespostas] = useState(Array(campos.length).fill(""));

  const handleChange = (index, value) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = value;
    setRespostas(novasRespostas);
  };

  const preencherEmpresa = (empresaNome) => {
    if (!empresaNome) return;

    const empresa = empresas[empresaNome];
    const novasRespostas = [...respostas];

    novasRespostas[1] = empresa.ra;
    novasRespostas[2] = empresa.polo;
    novasRespostas[3] = empresa.periodo;
    novasRespostas[4] = empresa.anoLetivo;
    novasRespostas[5] = empresaNome;
    novasRespostas[6] = empresa.setor;
    novasRespostas[7] = empresa.info;
    novasRespostas[8] = empresa.plano;

    setRespostas(novasRespostas);
  };

  const gerarPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 15;

    const logoImg = new Image();
    logoImg.src = logo;
    await new Promise((resolve) => {
      logoImg.onload = () => {
        doc.addImage(logoImg, "PNG", pageWidth - 50, y, 35, 20);
        resolve();
      };
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("CURSO: CIÊNCIAS CONTÁBEIS", 15, y + 5);
    doc.setFontSize(11);
    doc.text("Relatório de Estágio Supervisionado", 15, y + 12);
    doc.setFontSize(10);
    doc.text(" (35) 2101-3150", pageWidth - 50, y + 30);

    y += 35;

    autoTable(doc, {
      startY: y,
      theme: "grid",
      head: [["IDENTIFICAÇÃO DO ESTAGIÁRIO"]],
      body: [
        [`Nome: ${respostas[0] || ""}`],
        [`RA: ${respostas[1] || ""}`],
        [`Polo: ${respostas[2] || ""}`],
        [`Período do Estágio: ${respostas[3] || ""}`],
        [`Ano Letivo: ${respostas[4] || ""}`],
      ],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [230, 230, 230], halign: "center" },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      theme: "grid",
      head: [["IDENTIFICAÇÃO DA EMPRESA"]],
      body: [
        [`Empresa concedente: ${respostas[5] || ""}`],
        [`Setor do estágio supervisionado: ${respostas[6] || ""}`],
      ],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [230, 230, 230], halign: "center" },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      theme: "grid",
      head: [["INFORMAÇÕES SOBRE A EMPRESA"]],
      body: [[respostas[7] || ""]],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [230, 230, 230], halign: "center" },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      theme: "grid",
      head: [["PLANO DE AÇÃO"]],
      body: [[respostas[8] || ""]],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [230, 230, 230], halign: "center" },
    });

    const qrUrl = "https://www.mg.senac.br";
    const qrCodeDataUrl = await QRCode.toDataURL(qrUrl);
    doc.addImage(qrCodeDataUrl, "PNG", pageWidth - 35, 275, 20, 20);

    doc.setFontSize(9);
    doc.setTextColor(130);
    doc.text("Sistema de Estágio Senac | © 2025", pageWidth / 2, 287, { align: "center" });

    doc.save("Relatorio_Estagio_Supervisionado.pdf");
  };

  return (
    <main className="extra">
      <div className="home-content-box">
       

        <Theme />

        <div className="formulario-container">
          <h2 className="titulo">Registro de Estágio Supervisionado</h2>

          <div className="pergunta">
            <label><strong>Empresa pré-cadastrada:</strong></label>
            <select onChange={(e) => preencherEmpresa(e.target.value)}>
              <option value="">Selecione uma empresa</option>
              {Object.keys(empresas).map((nome, i) => (
                <option key={i} value={nome}>{nome}</option>
              ))}
            </select>
          </div>

          {campos.map((campo, index) => (
            <div className="pergunta" key={index}>
              <label><strong>{index + 1}.</strong> {campo}</label>
              <textarea
                rows={campo.includes("Informações") || campo.includes("Plano") ? 4 : 1}
                value={respostas[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Digite aqui..."
              />
            </div>
          ))}

          <button className="btn-enviar" onClick={gerarPDF}>Salvar PDF</button>
        </div>
      </div>
    </main>
  );
}
