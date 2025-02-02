import styles from './DeleteButton.module.css';
import icon from './AiFillDelete.png';

function DeleteButton({ onClick }) {
    return (
        <button className={styles.deleteButton} onClick={onClick}>
            <img src={icon} alt="Ícone" className={styles.deleteButtonIcon} />
            <span style={{color:'#AF0505'}}>Deletar</span>
        </button>
    );
}

export default DeleteButton;
