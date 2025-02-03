import React, { useRef } from 'react';
import styles from './FilesButton.module.css';
import icon from './BsFillPlusCircleFill.png';
import api from '../../api'; // Ajuste o caminho conforme necessário

function FilesButton({ taskId, updateCard }) {
  const fileInputRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
    setIsClicked(!isClicked);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await api.uploadFile(taskId, file);
        updateCard(); // Atualiza os dados do card após upload
      } catch (error) {
        console.error('Erro ao enviar arquivo:', error);
        alert('Erro ao enviar arquivo');
      }
    }
    setIsClicked(false);
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <button
        className={`${styles.filesButton} ${isClicked ? styles.clicked : ""}`}
        onClick={handleButtonClick}
      >
        <img src={icon} alt="Ícone" className={styles.filesButtonIcon} />
        <span>Adicionar arquivo</span>
      </button>
    </div>
  );
}

export default FilesButton;