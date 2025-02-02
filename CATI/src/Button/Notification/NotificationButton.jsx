import styles from './NotificationButton.module.css'
import icon from './BsBellFill.png';
import React, { useState } from 'react';



function NotificationButton(){
    
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    return (
        <button 
            className={`${styles.notificationButton} ${isClicked ? styles.clicked : ''}`} 
            onClick={handleClick}
        >
            <img src={icon} alt="Ícone" className={styles.notificationButtonIcon} />
        </button>   
    )
}

export default NotificationButton