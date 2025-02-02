import styles from './PriorityTag.module.css';

function PriorityTagVHigh(){
    return (
        <span className={`${styles.priorityVHigh} ${styles.priorityTag}`}>
             Altíssima Prioridade
        </span>
    );
}

export default PriorityTagVHigh