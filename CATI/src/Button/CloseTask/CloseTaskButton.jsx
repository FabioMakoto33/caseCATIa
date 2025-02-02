import styles from './CloseTaskButton.module.css'
import icon from './BsArrowBarRight.png';
import React, { useState } from 'react';



function CloseTaskButton({onClick}){
    
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        if (onClick) {
            onClick(); 
        }
    };
    return (
        <button 
            className={`${styles.closetaskButton} ${isClicked ? styles.clicked : ''}`} 
            onClick={handleClick}
        >
            <img src={icon} alt="Ícone" className={styles.closetaskButtonIcon} />
        </button>   
    )
}

export default CloseTaskButton
