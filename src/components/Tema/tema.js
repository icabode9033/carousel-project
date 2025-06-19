import React, { useEffect, useState } from "react";
import "./tema.css"; // Estilização do botão
import sunIcon from "../../assets/Images/sun.png"; // Caminho correto até seu ícone
import moonIcon from "../../assets/Images/moon.png";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);   applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme) => {
    document.body.className = theme;

    const contentBox = document.getElementById("home-content-box");
    if (contentBox) {
      contentBox.className = `content-box ${theme}`;
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
        <img src={sunIcon} className="icon" alt="Light Mode" />
      <img src={moonIcon} className="icon" alt="Dark Mode" />
      <span className={`slider ${theme === "dark" ? "right" : "left"}`}></span>
    </button>
  );
}