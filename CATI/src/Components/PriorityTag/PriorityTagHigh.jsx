import styles from './PriorityTag.module.css';

function PriorityTagHigh(){
    return (
        <span className={`${styles.priorityHigh} ${styles.priorityTag}`}>
             Alta Prioridade
        </span>
    );
}

export default PriorityTagHigh