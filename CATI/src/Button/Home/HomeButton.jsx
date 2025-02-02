import styles from './HomeButton.module.css'
import icon from './home.png';
import React, { useState } from 'react';



function HomeButton(){
    
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    return (
        <button 
            className={`${styles.homeButton} ${isClicked ? styles.clicked : ''}`} 
            onClick={handleClick}
        >
            <img src={icon} alt="Ícone" className={styles.homeButtonIcon} />
        </button>   
    )
}

export default HomeButton