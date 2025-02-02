import styles from './NewTaskButton.module.css';
import icon from './BsFillPlusCircleFill.png';

function NewTaskButton({ onClick }) {
    return (
        <button className={styles.newtaskButton} onClick={onClick}>
            <img src={icon} alt="Ícone" className={styles.newtaskButtonIcon} />
            <span>Nova Tarefa</span>
        </button>
    );
}

export default NewTaskButton;
