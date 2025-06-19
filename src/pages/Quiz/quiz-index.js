import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Theme from "../../components/Tema/tema";
import questionsData from "../../components/questions"; // Importa as perguntas do quiz
import "../Quiz/quiz-index.css";
import { screen } from '@testing-library/react';

// Define todas as unidades (17 unidades) com 10 perguntas cada
const allUnits = {};
for (let i = 1; i <= 17; i++) {
  allUnits[`Unidade ${i}`] = questionsData.filter((q) => q.unit === i).slice(0, 10);
}

// Chave para armazenar o progresso no localStorage
const QUIZ_PROGRESS_LOCALSTORAGE_KEY = "meuQuizProgressoUnidades";

const Quiz = () => {
  // Memoiza as unidades para evitar recálculos desnecessários
  const units = useMemo(() => allUnits, []);

  // Função para gerar o estado inicial padrão do progresso
  const getDefaultInitialProgress = () => {
    const initial = {};
    const currentUnitKeys = Object.keys(allUnits);
    
    currentUnitKeys.forEach((unitName, index) => {
      initial[unitName] = {
        score: 0,
        completed: false,
        unlocked: index === 0, // A primeira unidade começa desbloqueada
        attempted: false,
      };
    });
    return initial;
  };

  // Estado que gerencia o progresso das unidades (carrega do localStorage)
  const [unitProgress, setUnitProgress] = useState(() => {
    const defaultProgress = getDefaultInitialProgress();

    try {
      const savedProgressString = localStorage.getItem(QUIZ_PROGRESS_LOCALSTORAGE_KEY);
      
      if (savedProgressString) {
        const loadedSavedProgress = JSON.parse(savedProgressString);
        const combinedProgress = {};
        let atLeastOneUnitIsCurrentlyUnlocked = false;
        const currentUnitKeysFromCode = Object.keys(allUnits);

        currentUnitKeysFromCode.forEach((unitName) => {
          const defaultUnitDataForThisUnit = defaultProgress[unitName] || { 
            score: 0, 
            completed: false, 
            unlocked: false, 
            attempted: false 
          };
          const savedUnitData = loadedSavedProgress[unitName];

          if (savedUnitData) {
            combinedProgress[unitName] = {
              score: typeof savedUnitData.score === 'number' ? savedUnitData.score : defaultUnitDataForThisUnit.score,
              completed: typeof savedUnitData.completed === 'boolean' ? savedUnitData.completed : defaultUnitDataForThisUnit.completed,
              unlocked: typeof savedUnitData.unlocked === 'boolean' ? savedUnitData.unlocked : defaultUnitDataForThisUnit.unlocked,
              attempted: typeof savedUnitData.attempted === 'boolean' ? savedUnitData.attempted : defaultUnitDataForThisUnit.attempted,
            };
          } else {
            combinedProgress[unitName] = defaultUnitDataForThisUnit;
          }

          if (combinedProgress[unitName]?.unlocked) {
            atLeastOneUnitIsCurrentlyUnlocked = true;
          }
        });

        // Se nenhuma unidade estiver desbloqueada, desbloqueia a primeira
        if (!atLeastOneUnitIsCurrentlyUnlocked && currentUnitKeysFromCode.length > 0) {
          const firstUnitNameInCode = currentUnitKeysFromCode[0];
          if (combinedProgress[firstUnitNameInCode]) {
            combinedProgress[firstUnitNameInCode].unlocked = true;
          }
        }
        return combinedProgress;
      } else {
        return defaultProgress;
      }
    } catch (error) {
      console.error("Falha ao carregar/processar o progresso do localStorage:", error);
      return defaultProgress;
    }
  });

  // Salva o progresso no localStorage sempre que unitProgress mudar
  useEffect(() => {
    try {
      if (Object.keys(unitProgress).length > 0) {
        localStorage.setItem(QUIZ_PROGRESS_LOCALSTORAGE_KEY, JSON.stringify(unitProgress));
      } else if (localStorage.getItem(QUIZ_PROGRESS_LOCALSTORAGE_KEY)) {
        localStorage.removeItem(QUIZ_PROGRESS_LOCALSTORAGE_KEY);
      }
    } catch (error) {
      console.error("Falha ao salvar o progresso no localStorage:", error);
    }
  }, [unitProgress]);

  // Estados para gerenciar o quiz atual
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Pega as perguntas da unidade selecionada
  const questions = selectedUnit ? units[selectedUnit] || [] : [];

  // Manipula a seleção de uma unidade
  const handleUnitSelect = (unitName) => {
    if (!unitProgress[unitName]?.unlocked) {
      alert("🔒 Esta unidade está bloqueada. Complete a unidade anterior com pelo menos 70% de acerto para desbloqueá-la.");
      return;
    }
    if (!units[unitName] || units[unitName].length === 0) {
        alert("📝 Esta unidade não possui perguntas no momento.");
        return;
    }

    setSelectedUnit(unitName);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnsweredQuestions([]);
  };

  // Manipula a resposta selecionada pelo usuário
  const handleAnswer = (option) => {
    setSelected(option);
    let currentAttemptScore = score;
    if (option === questions[current].answer) {
      currentAttemptScore++;
      setScore(s => s + 1);
    }

    if (!answeredQuestions.includes(current)) {
      setAnsweredQuestions([...answeredQuestions, current]);
    }

    // Avança para próxima pergunta ou finaliza o quiz
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);
        const finalUnitScore = currentAttemptScore;
        const numQuestions = questions.length;
        const percentage = numQuestions > 0 ? (finalUnitScore / numQuestions) * 100 : 0;
        const unitName = selectedUnit;

        // Atualiza o progresso da unidade
        setUnitProgress(prevProgress => {
          const newProgressDataForUnit = {
            ...prevProgress[unitName],
            score: finalUnitScore,
            completed: true,
            attempted: true,
          };

          const updatedOverallProgress = {
            ...prevProgress,
            [unitName]: newProgressDataForUnit,
          };

          // Se acertou 70% ou mais, desbloqueia a próxima unidade
          if (percentage >= 70 && numQuestions > 0) {
            const unitKeys = Object.keys(units);
            const currentUnitIndex = unitKeys.indexOf(unitName);
            if (currentUnitIndex < unitKeys.length - 1) {
              const nextUnitName = unitKeys[currentUnitIndex + 1];
              updatedOverallProgress[nextUnitName] = {
                ...prevProgress[nextUnitName],
                unlocked: true,
              };
            }
          }
          return updatedOverallProgress;
        });
      }
    }, 1000);
  };

  // Funções auxiliares para navegação
  const restartQuizAndGoToSelection = () => {
    setSelectedUnit(null);
  };

  const tryAgainCurrentUnit = () => {
    if (selectedUnit) {
      handleUnitSelect(selectedUnit);
    }
  };

  const advanceToNextUnit = () => {
    const unitKeys = Object.keys(units);
    const currentUnitIndex = unitKeys.indexOf(selectedUnit);
    if (currentUnitIndex < unitKeys.length - 1) {
      const nextUnitName = unitKeys[currentUnitIndex + 1];
      if (unitProgress[nextUnitName]?.unlocked) {
        handleUnitSelect(nextUnitName);
      } else {
        alert("Erro: A próxima unidade não está desbloqueada.");
        setSelectedUnit(null);
      }
    }
  };

  // Calcula a próxima unidade para navegação
  const currentUnitIndexGlobal = selectedUnit ? Object.keys(units).indexOf(selectedUnit) : -1;
  const nextUnitNameGlobal = currentUnitIndexGlobal !== -1 && currentUnitIndexGlobal < Object.keys(units).length - 1
    ? Object.keys(units)[currentUnitIndexGlobal + 1]
    : null;

  return (
    <div className="home-content-box">
      {/* Cabeçalho com navegação */}
      
      
              <Theme />

      {/* Conteúdo principal do Quiz */}
      <div className="quiz-wrapper">
        {/* Sidebar com lista de unidades */}
        <aside className="quiz-sidebar">
          <h3>Unidades</h3>
          <ul className="unit-list-vertical">
            {Object.keys(units).map((unitName) => {
              const progress = unitProgress[unitName] || { 
                score: 0, 
                completed: false, 
                unlocked: (Object.keys(units).indexOf(unitName) === 0), 
                attempted: false 
              };
              const unitData = units[unitName] || [];
              let statusIndicator = "";
              let itemClassName = "";

              // Determina o status e estilo de cada unidade
              if (!progress?.unlocked) {
                statusIndicator = " 🔒";
                itemClassName = "locked";
              } else if (progress?.completed) {
                itemClassName = "completed";
                if (unitData.length > 0 && (progress.score / unitData.length) * 100 >= 70) {
                  statusIndicator = " ✅";
                  itemClassName += " passed";
                } else if (unitData.length > 0) {
                  statusIndicator = " ❌";
                  itemClassName += " failed";
                } else {
                    statusIndicator = " N/A";
                    itemClassName += " empty";
                }
              } else {
                statusIndicator = " ➡️";
                itemClassName = "unlocked";
              }

              return (
                <li key={unitName}>
                  <button
                    className={`unit-tab ${selectedUnit === unitName ? "active" : ""} ${itemClassName}`}
                    onClick={() => handleUnitSelect(unitName)}
                    disabled={!progress?.unlocked || (units[unitName] && units[unitName].length === 0)}
                  >
                    {unitName}
                    {statusIndicator}
                    {units[unitName] && units[unitName].length === 0 && progress?.unlocked && " (Vazia)"}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Área principal que mostra perguntas ou resultados */}
        <main className="quiz-main">
          {!selectedUnit ? (
            // Tela inicial quando nenhuma unidade está selecionada
            <div className="unit-placeholder">
              <p>👋 Bem-vindo ao Quiz! Selecione uma unidade ao lado para começar.</p>
              <p><small>Seu progresso será salvo automaticamente.</small></p>
            </div>
          ) : finished ? (
            // Tela de resultados após completar uma unidade
            <div className="result">
              <h2>Resultado da {selectedUnit}</h2>
              <p>
                Você acertou {score} de {questions.length} perguntas (
                {questions.length > 0 ? ((score / questions.length) * 100).toFixed(0) : 0}%)
              </p>
              {questions.length > 0 && (score / questions.length) * 100 >= 70 ? (
                <>
                  <p><strong>🎉 Parabéns! Você passou nesta unidade.</strong></p>
                  {nextUnitNameGlobal && unitProgress[nextUnitNameGlobal]?.unlocked ? (
                    <button onClick={advanceToNextUnit} className="next-unit-button">
                      Ir para {nextUnitNameGlobal} ➡️
                    </button>
                  ) : (
                     Object.keys(units).indexOf(selectedUnit) === Object.keys(units).length - 1 && <p>🏆 Você completou todas as unidades!</p>
                  )}
                </>
              ) : questions.length > 0 ? (
                <p>Você precisa acertar pelo menos 70% para desbloquear a próxima unidade. Não desanime! 💪</p>
              ) : (
                <p>Esta unidade não continha perguntas para avaliação.</p>
              )}
              {questions.length > 0 && <button onClick={tryAgainCurrentUnit}>Tentar Novamente {selectedUnit} 🔁</button>}
              <button onClick={restartQuizAndGoToSelection}>Escolher outra unidade 📚</button>
            </div>
          ) : questions.length > 0 ? (
            // Tela de perguntas durante o quiz
            <div className="question-box">
              <h2>{questions[current]?.question}</h2>
              <div className="options">
                {questions[current].options.map((option) => (
                  <button
                    key={option}
                    className={`option-button ${
                      selected
                        ? option === questions[current].answer
                          ? "correct"
                          : option === selected
                          ? "incorrect"
                          : ""
                        : ""
                    }`}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selected}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="quiz-progress">
                {[...Array(questions.length)].map((_, index) => (
                  <div
                    key={index}
                    className={`progress-dot ${
                      answeredQuestions.includes(index) ? "answered" : ""
                    } ${index === current ? "current" : ""}`}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
             // Tela quando a unidade selecionada não tem perguntas
             <div className="unit-placeholder">
                <p>😕 Parece que não há perguntas para a {selectedUnit}. Por favor, selecione outra unidade.</p>
                <button onClick={restartQuizAndGoToSelection}>Voltar para seleção</button>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Quiz;