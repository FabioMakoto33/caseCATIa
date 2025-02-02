import styles from './PriorityTag.module.css';

function PriorityTagLow(){
    return (
        <span className={`${styles.priorityLow} ${styles.priorityTag}`}>
             Baixa Prioridade
        </span>
    );
}

export default PriorityTagLow