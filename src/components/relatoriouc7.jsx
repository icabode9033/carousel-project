import React from "react";
import "../components/relatoriouc.css"

const habilidades = [
  "Higienizar as mãos conforme a OMS",
  "Utilizar equipamentos de proteção",
  "Comunicar-se de maneira assertiva",
  "Selecionar materiais, equipamentos e instrumental",
  "Utilizar técnicas assépticas",
  "Acomodar o cliente conforme ambiência, segurança e Política Nacional de Humanização",
  "Adotar estratégias de comunicação terapêutica como recurso para vínculo, de acordo com o quadro clínico do cliente",
  "Transportar o cliente de acordo com os recursos disponíveis e protocolo da instituição",
  "Mobilizar o cliente para manter a dinâmica corporal de acordo com a prescrição médica e de enfermagem",
  "Preparar o cliente de acordo com os procedimentos necessários para a realização dos exames solicitados",
  "Coletar materiais biológicos conforme os protocolos institucionais",
  "Realizar banho ou higiene, considerando o ciclo vital e o grau de dependência do cliente",
  "Avaliar a dor conforme escala preconizada pela instituição",
  "Instalar oxigenoterapia de acordo com a prescrição médica",
  "Aspirar vias aéreas superiores de acordo com a necessidade do cliente, prescrição e legislação",
  "Instalar dieta de acordo com a prescrição médica e o tipo de dispositivo",
  "Realizar curativos conforme necessidade, prescrição e protocolo",
  "Realizar procedimentos de calor e frio conforme prescrição",
  "Participar no desenvolvimento do projeto terapêutico",
  "Realizar contenção conforme intercorrências, protocolo e prescrição",
  "Administrar psicofármacos conforme prescrição e protocolo",
  "Sinalizar situações de risco conforme sintomas",
  "Preparar o corpo pós-morte respeitando aspectos religiosos e culturais",
  "Registrar atividades conforme protocolo institucional",
  "Adotar boas práticas na promoção da saúde e prevenção de doenças",
  "Identificar medidas de prevenção de doenças",
  "Identificar situações de vulnerabilidade",
  "Identificar alterações comportamentais",
  "Identificar a necessidade de contenção",
  "Identificar os aspectos do próprio trabalho que interferem no serviço",
  "Mediar conflitos nas situações de trabalho"
];

const atitudes = [
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
  "Respeito às normas técnicas e legislações vigentes"
];

const opcoes = ["Sim", "Não", "Parcialmente", "N/A"];

export default function RelatorioUC7({ uc, dados, setDados }) {
  const handleChange = (campo, valor) => {
    setDados({ ...dados, [campo]: valor });
  };

  const handleOpcao = (habilidade, opcao) => {
    setDados({
      ...dados,
      habilidades: {
        ...(dados.habilidades || {}),
        [habilidade]: opcao,
      },
    });
  };

  return (
    <div className="relatorio-uc">
      <h3>Relatório da {uc}</h3>

      <label>Nome do Aluno:</label>
      <input
        type="text"
        value={dados.nome || ""}
        onChange={(e) => handleChange("nome", e.target.value)}
        placeholder="Digite seu nome"
      />

      <label>Introdução:</label>
      <textarea
        rows={4}
        value={dados.introducao || ""}
        onChange={(e) => handleChange("introducao", e.target.value)}
        placeholder="Descreva a instituição e contexto do estágio..."
      />

      <label>Atividades desenvolvidas:</label>
      <textarea
        rows={5}
        value={dados.atividades || ""}
        onChange={(e) => handleChange("atividades", e.target.value)}
        placeholder="Liste as atividades realizadas durante o estágio..."
      />

      <label>Conclusão:</label>
      <textarea
        rows={4}
        value={dados.conclusao || ""}
        onChange={(e) => handleChange("conclusao", e.target.value)}
        placeholder="Relate o aprendizado e avaliação do estágio..."
      />

      <h4>Habilidades Desenvolvidas</h4>
      <div className="tabela-habilidades">
        {habilidades.map((hab, idx) => (
          <div key={idx} className="linha-hab">
            <span className="hab-nome">{hab}</span>
            {opcoes.map((opcao) => (
              <label key={opcao}>
                <input
                  type="radio"
                  name={`hab-${idx}`}
                  value={opcao}
                  checked={(dados.habilidades?.[hab] || "") === opcao}
                  onChange={() => handleOpcao(hab, opcao)}
                />
                {opcao}
              </label>
            ))}
          </div>
        ))}
      </div>

      <h4>Atitudes e Valores</h4>
      <div className="tabela-habilidades">
        {atitudes.map((att, idx) => (
          <div key={`att-${idx}`} className="linha-hab">
            <span className="hab-nome">{att}</span>
            {opcoes.map((opcao) => (
              <label key={opcao}>
                <input
                  type="radio"
                  name={`att-${idx}`}
                  value={opcao}
                  checked={(dados.habilidades?.[att] || "") === opcao}
                  onChange={() => handleOpcao(att, opcao)}
                />
                {opcao}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
