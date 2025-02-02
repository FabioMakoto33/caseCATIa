import styles from './ProfileMobileButton.module.css'
import icon from './account_circle.png';
import React, { useState } from 'react';



function ProfileMobileButton(){
    
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

export default ProfileMobileButton