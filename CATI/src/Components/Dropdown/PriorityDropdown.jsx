import { useState } from "react";
import styles from "./PriorityDropdown.module.css";
import icon from "./BsCaretDownFill.png";
import PriorityTagHigh from "../PriorityTag/PriorityTagHigh";
import PriorityTagVHigh from "../PriorityTag/PriorityTagVHigh";
import PriorityTagMid from "../PriorityTag/PriorityTagMid";
import PriorityTagLow from "../PriorityTag/PriorityTagLow";

// Defina os componentes de prioridade diretamente no array
const priorityOptions = [
  { value: "low", component: <PriorityTagLow /> },
  { value: "mid", component: <PriorityTagMid /> },
  { value: "high", component: <PriorityTagHigh /> },
  { value: "vhigh", component: <PriorityTagVHigh /> },
];

export default function PriorityDropdown({ priority, setPriority }) {
  const [open, setOpen] = useState(false);
  const selectedOption = priorityOptions.find((opt) => opt.value === priority);

  return (
    <div className={styles.dropdown}>
      {/* Botão que exibe a opção selecionada */}
      <button
        onClick={() => setOpen(!open)}
        className={styles.dropdownButton}
      >
        <div className={styles.buttonContent}>
          {selectedOption.component} {/* Renderiza o componente de prioridade */}
          <img src={icon} alt="Seta" className={styles.dropdownIcon} /> {/* Seta dentro do botão */}
        </div>
      </button>

      {/* Lista de opções visível apenas se `open` for true */}
      {open && (
        <div className={styles.dropdownMenu}>
          {priorityOptions.map((option) => (
            <div
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => {
                setPriority(option.value);
                setOpen(false); // Fecha o menu após selecionar
              }}
            >
              {option.label}
              {option.component} {/* Renderiza o componente de prioridade */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}