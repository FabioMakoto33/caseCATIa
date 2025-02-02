import React, { useState } from 'react';
import styles from './FinishTaskButton.module.css';
import icon from './State=default.png';
import iconHover from './State=hover.png';
import iconClicked from './State=finished.png';

function FinishTaskButton() {
    const [isClicked, setIsClicked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    // Escolhe a imagem com base no estado
    const currentIcon = isClicked
        ? iconClicked
        : isHovered
        ? iconHover
        : icon;

    return (
        <button
            className={styles.finishtaskButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <img
                src={currentIcon}
                alt="Ícone"
                className={styles.finishtaskButtonIcon}
            />
        </button>
    );
}

export default FinishTaskButton;
