import styles from './PriorityTag.module.css';

function PriorityTagMid(){
    return (
        <span className={`${styles.priorityMedium} ${styles.priorityTag}`}>
             Média Prioridade
        </span>
    );
}

export default PriorityTagMid