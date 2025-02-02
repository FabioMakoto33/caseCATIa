import styles from './NewListButton.module.css';
import icon from './BsFillPlusCircleFill.png';

function NewListButton({ onClick }) {
    return (
        <button className={styles.newlistButton} onClick={onClick}>
            <img src={icon} alt="Ícone" className={styles.newlistButtonIcon} />
            <span>Nova Lista</span>
        </button>
    );
}

export default NewListButton;
