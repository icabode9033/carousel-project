import React from "react";
import "../components/relatoriouc.css"

const habilidades = [
  "Zelar pela apresentação pessoal e postura profissional",
  "Higienizar as mãos conforme a OMS",
  "Utilizar equipamentos de proteção",
  "Comunicar-se de maneira assertiva",
  "Selecionar materiais, equipamentos e instrumental",
  "Utilizar técnicas assépticas",
  "Auxiliar no processo de acolhimento e classificação de risco",
  "Identificar reações, sinais e sintomas do cliente",
  "Monitorar parâmetros vitais em situações de urgência e emergência",
  "Auxiliar em procedimentos invasivos",
  "Organizar carro de emergência",
  "Identificar parada cardiorrespiratória",
  "Atender PCR conforme suporte básico e avançado",
  "Auxiliar no transporte do cliente crítico",
  "Acomodar cliente crítico em ambiente de alta complexidade",
  "Mensurar balanço hídrico",
  "Identificar sinais de agravo clínico",
  "Aspirar vias aéreas superiores ou cânula orotraqueal",
  "Adotar medidas de precaução e isolamento",
  "Identificar medidas de prevenção de doenças",
  "Adotar boas práticas na promoção e recuperação da saúde",
  "Preparar o ambiente para cuidados paliativos",
  "Atender necessidades do cliente conforme Política Nacional de Cuidados Paliativos",
  "Realizar medidas de conforto e bem-estar",
  "Monitorar estado clínico com base no cuidado humanizado",
  "Prestar cuidados ao cliente no pós-morte",
  "Organizar o ambiente e processos de trabalho",
  "Operar recursos tecnológicos aplicados à saúde",
  "Interpretar documentos técnicos",
  "Utilizar termos técnicos na rotina de trabalho",
  "Identificar interferências do próprio trabalho no serviço",
  "Mediar conflitos nas situações de trabalho"
];

const atitudes = [
  "Comprometimento com o atendimento humanizado",
  "Comprometimento com o cuidado prestado",
  "Escuta ativa",
  "Responsabilidade no uso dos recursos organizacionais",
  "Colaboração, flexibilidade e iniciativa no trabalho em equipe",
  "Proatividade na resolução de problemas",
  "Respeito à diversidade e valores culturais e religiosos",
  "Respeito ao limite da atuação profissional",
  "Responsabilidade no descarte de resíduos",
  "Sigilo no tratamento de dados e informações",
  "Registro das ações conforme rotina da instituição",
  "Responsabilidade no cumprimento das normas de segurança",
  "Respeito às normas técnicas e legislações vigentes"
];

const opcoes = ["Sim", "Não", "Parcialmente", "N/A"];

export default function RelatorioUC17({ uc, dados, setDados }) {
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
