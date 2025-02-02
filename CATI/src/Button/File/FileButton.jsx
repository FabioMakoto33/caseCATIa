import styles from './FileButton.module.css'
import icon from './BsFillPlusCircleFill.png';
import React, { useState } from 'react';



function FileButton(){
    
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    return (
        <button 
            className={`${styles.fileButton} ${isClicked ? styles.clicked : ''}`} 
            onClick={handleClick}
        >
            <img src={icon} alt="Ícone" className={styles.fileButtonIcon} />
            <span>Adicionar Arquivo</span>
        </button>   
    )
}

export default FileButton