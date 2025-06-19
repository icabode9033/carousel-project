import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import logo from "../../assets/Images/senac-logo.png";
import iconeSim from "../../assets/Images/icone-sim.png";
import iconeNao from "../../assets/Images/icone-nao.png";
import iconeParcial from "../../assets/Images/icone-parcial.png";

const atitudesList = [
  "Comprometimento com o atendimento humanizado",
  "Responsabilidade no uso dos recursos organizacionais",
  "Colaboração, flexibilidade e iniciativa no desenvolvimento do trabalho em equipe",
  "Proatividade na resolução de problemas",
  "Respeito à diversidade e aos valores morais, culturais e religiosos do cliente e da família",
  "Respeito ao limite da atuação profissional",
  "Responsabilidade no descarte de resíduos",
  "Sigilo no tratamento de dados e informações",
  "Zelo na apresentação pessoal e postura profissional",
  "Responsabilidade no cumprimento das normas de segurança",
  "Respeito às normas técnicas e legislações vigentes",
  "Escuta Ativa",
  "Registro das Ações de Enfermagem conforme a rotina e protocolo da Instituição"
];

// Validação de campos obrigatórios
export function validarCamposParaPDF({ uc, empresa, relatorio, checklist, tipo }) {
  if (!tipo || !uc) return "Tipo de documento ou Unidade Curricular (UC) estão vazios.";

  if (tipo === "Relatório") {
    if (!empresa?.nome || !relatorio?.nome || !relatorio?.atividades || !relatorio?.conclusao || !empresa.periodoEstagio) {
      return "Campos obrigatórios do relatório estão faltando.";
    }

    const habilidades = relatorio.habilidades || {};
    if (Object.keys(habilidades).length === 0) {
      return "Nenhuma habilidade ou atitude foi avaliada.";
    }
  }

  if (tipo === "Checklist") {
    if (!checklist?.turma || !checklist?.matrizCurricular || !checklist?.aluno || !checklist?.cargaHoraria || !checklist?.resultado) {
      return "Campos obrigatórios do checklist estão faltando.";
    }

    if (!checklist.itens || Object.keys(checklist.itens).length === 0) {
      return "Checklist não possui itens para avaliação.";
    }
  }

  return null;
}

// Geração do texto da introdução com base na empresa
function gerarTextoIntroducao(empresaNome, dataEstagio) {
  const empresas = {
    "Tech Solutions S/A": {
      descricao: "empresa focada em desenvolvimento de software corporativo, com atuação em diversas áreas da tecnologia da informação, especialmente voltadas para sistemas de gestão empresarial."
    },
    "Contábil Mais Ltda": {
      descricao: "escritório contábil especializado no atendimento de pequenas empresas, oferecendo serviços nas áreas fiscal, contábil e de consultoria financeira."
    },
    "EcoGestão Ambiental": {
      descricao: "consultoria especializada em gestão e licenciamento ambiental, atuando em projetos sustentáveis e relatórios de impacto ambiental em toda a região."
    },
    "ESF Parque Esperança III": {
      descricao: "unidade de Estratégia Saúde da Família situada em Poços de Caldas, com equipe multidisciplinar voltada ao atendimento da comunidade, composta por médica, enfermeira, técnicas de enfermagem, agentes de saúde e profissionais do NASF."
    }
  };

  const empresa = empresas[empresaNome];

  if (!empresa) return "Introdução indisponível para esta empresa.";

  return `Este relatório tem como objetivo descrever as atividades realizadas, observadas e acompanhadas durante o estágio curricular na ${empresaNome}, ${empresa.descricao} O estágio foi realizado no período de ${dataEstagio}.`;
}

// Geração do PDF completo
export default async function gerarPDF({ uc, empresa, relatorio, tipo }) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const logoImg = new Image();
  logoImg.src = logo;
  await new Promise((resolve) => (logoImg.onload = resolve));

  const loadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });

  const emojiImages = {
    sim: await loadImage(iconeSim),
    nao: await loadImage(iconeNao),
    parcial: await loadImage(iconeParcial),
  };

  const gerarCapa = () => {
    doc.addImage(logoImg, "PNG", (pageWidth - 40) / 2, 20, 40, 25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Relatório de Estágio Obrigatório", pageWidth / 2, 60, { align: "center" });
    doc.setFontSize(12);
    doc.text("Curso: Técnico em Enfermagem", pageWidth / 2, 75, { align: "center" });
    doc.text(`Unidade Curricular: ${uc}`, pageWidth / 2, 83, { align: "center" });
    doc.text(`Carga horária: ${empresa.cargaHoraria || "80 horas"}`, pageWidth / 2, 91, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Aluno(a): ${relatorio.nome}`, 20, 130);
    doc.text(`Turma: ${empresa.turma || ""}`, 20, 138);
    doc.text(`Data de Entrega: ${empresa.dataEntrega || ""}`, 20, 146);
    doc.text(`Instituição Concedente: ${empresa.nome}`, 20, 154);
    doc.text(`Instrutor(es): ${empresa.instrutores || ""}`, 20, 162);
  };

  const gerarIdentificacao = () => {
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Identificação", 15, 20);
    const info = [
      [`Nome do(a) aluno(a): ${relatorio.nome}`],
      [`CPF do(a) aluno(a): ${empresa.cpf || ""}`],
      [`Turma: ${empresa.turma || ""}`],
      [`Data da entrega: ${empresa.dataEntrega || ""}`],
      [`Unidade concedente: ${empresa.nome}`],
      [`Instrutor(es): ${empresa.instrutores || ""}`]
    ];
    autoTable(doc, {
      startY: 30,
      body: info.map((i) => [i]),
      styles: { fontSize: 11, cellPadding: 3 },
    });
  };

  const gerarIntroducao = () => {
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Introdução", 15, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const texto = gerarTextoIntroducao(empresa.nome, empresa.periodoEstagio || "");
    const linhas = doc.splitTextToSize(texto, 180);
    doc.text(linhas, 15, 30);
  };

  const gerarAtividades = () => {
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Relatório de Atividades Realizadas no Campo de Estágio", 15, 20);
    const habilidades = Object.entries(relatorio.habilidades || {}).filter(
      ([t]) => !atitudesList.includes(t)
    );
    const linhas = habilidades.map(([titulo, val]) => {
      const resposta = val?.toLowerCase();
      return [
        { content: titulo },
        {
          content: "",
          didParseCell: (data) => {
            let imagem = null;
            if (resposta === "sim") imagem = emojiImages.sim;
            else if (resposta === "não") imagem = emojiImages.nao;
            else if (resposta === "parcialmente") imagem = emojiImages.parcial;
            if (imagem) {
              const { x, y, width } = data.cell;
              const imgX = x + width / 2 - 4;
              doc.addImage(imagem, "PNG", imgX, y + 1.5, 8, 8);
            }
          },
        },
      ];
    });
    autoTable(doc, {
      startY: 30,
      head: [["Habilidades", "Avaliação"]],
      body: linhas,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [230, 230, 230] },
    });
  };

  const gerarAtitudes = () => {
    const atitudes = Object.entries(relatorio.habilidades || {}).filter(
      ([t]) => atitudesList.includes(t)
    );
    if (atitudes.length === 0) return;

    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Atitudes / Valores", 15, 20);

    const linhas = atitudes.map(([titulo, val]) => {
      const resposta = val?.toLowerCase();
      return [
        { content: titulo },
        {
          content: "",
          didParseCell: (data) => {
            let imagem = null;
            if (resposta === "sim") imagem = emojiImages.sim;
            else if (resposta === "não") imagem = emojiImages.nao;
            else if (resposta === "parcialmente") imagem = emojiImages.parcial;
            if (imagem) {
              const { x, y, width } = data.cell;
              const imgX = x + width / 2 - 4;
              doc.addImage(imagem, "PNG", imgX, y + 1.5, 8, 8);
            }
          },
        },
      ];
    });

    autoTable(doc, {
      startY: 30,
      head: [["Atitude / Valor", "Avaliação"]],
      body: linhas,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [230, 230, 230] },
    });
  };

  const gerarConclusao = () => {
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Conclusão", 15, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const texto = relatorio.conclusao || "";
    const linhas = doc.splitTextToSize(texto, 180);
    doc.text(linhas, 15, 30);
  };

  const gerarRodape = async () => {
    const qrUrl = "https://www.mg.senac.br";
    const qrCodeDataUrl = await QRCode.toDataURL(qrUrl);
    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setDrawColor(200);
      doc.line(15, 273, pageWidth - 15, 273);
      doc.addImage(qrCodeDataUrl, "PNG", pageWidth - 35, 275, 18, 18);
      doc.setFontSize(9);
      doc.setTextColor(130);
      doc.text("Sistema de Estágio Senac | © 2025", pageWidth / 2, 287, { align: "center" });
    }
  };

  // Execução das seções
  gerarCapa();
  gerarIdentificacao();
  gerarIntroducao();
  gerarAtividades();
  gerarAtitudes();
  gerarConclusao();
  await gerarRodape();

  doc.save(`${tipo}_Estagio_${uc}.pdf`);
}
