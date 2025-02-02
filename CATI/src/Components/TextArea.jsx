import React, { useState } from "react";

const TextArea = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value); // Estado local para o valor do textarea

  // Atualiza o estado local enquanto o usuário digita
  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  // Atualiza o estado global (via prop `onChange`) quando o usuário clica fora
  const handleBlur = () => {
    onChange(localValue);
  };

  return (
    <textarea
      value={localValue}
      onChange={handleChange} // Atualiza o estado local
      onBlur={handleBlur} // Atualiza o estado global ao sair do textarea
      placeholder="Descrição"
    />
  );
};

export default TextArea;