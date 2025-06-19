import { useState } from "react"; // Adicione esta linha
import { Link } from "react-router-dom";
import "../Formulário/form-index.css";
import jsPDF from "jspdf";
import Theme from "../../components/Tema/tema";

import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import logo from "../../assets/Images/senac-logo.png"; // coloque o caminho da logo

const perguntas = [
  "Prescrição correta",
  "Paciente certo",
  "Medicamento certo",
  "Forma/apresentação certa",
  "Quantidade certa",
  "Orientação ao paciente",
  "Via de administração certa",
  "Horário certo",
  "Tempo de administração certo",
  "Ação certa",
  "Registro certo",
  "Validade certa",
  "Dose certa"
];

const cores = [
  "#00bfa6", "#00bfa6","#00bfa6","#00bfa6","#00bfa6",
  "#00bfa6","#00bfa6","#00bfa6","#00bfa6","#00bfa6",
  "#00bfa6","#00bfa6","#00bfa6",
];

export default function Formulario() {
  const [respostas, setRespostas] = useState(Array(13).fill(""));

  const handleChange = (index, value) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = value;
    setRespostas(novasRespostas);
  };

const gerarPDF = async () => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPosition = 20;

  // Inserir logo
  const logoImg = new Image();
  logoImg.src = logo;
  await new Promise((resolve) => {
    logoImg.onload = () => {
    const logoWidth = 40;
    const logoHeight = 40;
    const xLogo = (pageWidth - logoWidth) / 2; // Centraliza a imagem
    doc.addImage(logoImg, "PNG", xLogo, yPosition, logoWidth, logoHeight);
    resolve();
    };
  });
  yPosition += 30;

  // Título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(33, 33, 33);
  doc.text("Checklist - Administração de Medicamentos - Senac", pageWidth / 2, yPosition + 8, { align: "center" });
  yPosition += 25;

  // Subtítulo
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Preenchido em: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 10;

  // Dados da tabela
  const tableBody = perguntas.map((pergunta, i) => {
    const resposta = respostas[i]?.trim() || "";
    return [
      i + 1,
      pergunta,
      resposta ? { content: resposta, styles: { textColor: [0, 120, 0] } } : { content: "Não preenchido", styles: { textColor: [200, 0, 0] } }
    ];
  });

  autoTable(doc, {
    startY: yPosition,
    head: [["Nº", "Pergunta", "Resposta"]],
    body: tableBody,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [0, 191, 166], textColor: 255, halign: "center" },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 100 },
      2: { cellWidth: 70 }
    },
    margin: { left: margin, right: margin },
    theme: "striped"
  });

  // QR Code (Senac Minas)
  const qrUrl = "https://www.mg.senac.br";
  const qrCodeDataUrl = await QRCode.toDataURL(qrUrl);

  doc.addImage(qrCodeDataUrl, "PNG", pageWidth - 35, 275, 20, 20);

  // Rodapé
  doc.setFontSize(9);
  doc.setTextColor(130);
  doc.text("Sistema de Enfermagem Senac | © 2025", pageWidth / 2, 287, { align: "center" });

  // Salvar
  doc.save("ADM_medicamentos.pdf");
};
  

  return (
    <main className="extra">
      <div className='home-content-box'>
      
       
               <Theme />

        <div className="formulario-container">
          <h2 className="titulo">Administração de Medicamentos</h2>
          {perguntas.map((pergunta, index) => (
            <div
              className="pergunta"
              key={index}
              style={{ backgroundColor: cores[index] }}
            >
              <label>
                <strong>{index + 1}.</strong> {pergunta}
              </label>
              <input
                type="text"
                value={respostas[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Digite sua resposta..."
              />
            </div>
          ))}
          <button className="btn-enviar" onClick={gerarPDF}>Enviar</button>
        </div>
      </div>
    </main>
  );
}