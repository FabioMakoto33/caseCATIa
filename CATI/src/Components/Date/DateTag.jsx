import React from "react";
import styles from './DateTag.module.css'; // Importando o módulo CSS
import icon from './BsFillCalendarWeekFill.png'; // Importando o ícone

const DateTag = ({ date }) => {
  // Função para formatar a data
  const formatDate = (dateString) => {
    if (!dateString) return "";
  
    // Divide a string no formato "YYYY-MM-DD" ou "DD/MM/YYYY"
    const parts = dateString.includes("-") ? dateString.split("-") : dateString.split("/");
    
    let year, month, day;
    
    if (dateString.includes("-")) {
      // Formato "YYYY-MM-DD"
      [year, month, day] = parts;
    } else {
      // Formato "DD/MM/YYYY"
      [day, month, year] = parts;
    }
  
    // Criando a data sem considerar fuso horário
    const dateObj = new Date(year, month - 1, day);
  
    const monthName = dateObj.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "").toUpperCase(); 
  
    return `${day} ${monthName}, ${year}`;
  };

  return (
    <span className={styles.dateTag}>
      <img src={icon} alt="Ícone de calendário" className={styles.dateTagIcon} />
      {formatDate(date)}
    </span>
  );
};

export default DateTag;