import React, { useState } from 'react'; // Importe o useState
import styles from './FilesButton.module.css';
import icon from './BsFillPlusCircleFill.png';

function FilesButton({ onClick }) {
  // Adicione o estado isClicked
  const [isClicked, setIsClicked] = useState(false);

  // Função para lidar com o clique no botão
  const handleClick = () => {
    setIsClicked(!isClicked); // Alterna o estado isClicked
    onClick(); // Chama a função onClick passada como prop
  };

  return (
    <button
      className={`${styles.filesButton} ${isClicked ? styles.clicked : ""}`}
      onClick={handleClick} // Use a função handleClick
    >
      <img src={icon} alt="Ícone" className={styles.filesButtonIcon} />
      <span>Adicionar arquivo</span>
    </button>
  );
}

export default FilesButton;