import styles from "./ListOptionsButton.module.css";
import icon from "./BsThreeDots.png";
import React, { useState } from "react";
import ListOptionsMenu from "./ListOptionMenu.jsx"; // Importe o componente do menu de opções

function ListOptionsButton({ onRename, onDelete }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked); // Alterna a visibilidade do menu
  };

  const handleCloseMenu = () => {
    setIsClicked(false); // Fecha o menu
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className={`${styles.listoptionsButton} ${isClicked ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        <img src={icon} alt="Ícone" className={styles.listoptionsButtonIcon} />
      </button>

      {/* Exibe o menu de opções se isClicked for true */}
      {isClicked && (
        <ListOptionsMenu
          onRename={onRename}
          onDelete={onDelete}
          onClose={handleCloseMenu}
        />
      )}
    </div>
  );
}

export default ListOptionsButton;