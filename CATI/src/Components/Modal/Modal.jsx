import React, { useState, useEffect } from "react";
import "./Modal.css";
import PriorityTagVHigh from "../PriorityTag/PriorityTagVHigh.jsx";
import PriorityTagHigh from "../PriorityTag/PriorityTagHigh";
import PriorityTagMid from "../PriorityTag/PriorityTagMid.jsx";
import PriorityTagLow from "../PriorityTag/PriorityTagLow";
import CloseTaskButton from "../../Button/CloseTask/CloseTaskButton.jsx";
import DeleteButton from "../../Button/Delete/DeleteButton.jsx";
import closeIcon from "./Close.png";
import PriorityDropdown from "../Dropdown/PriorityDropdown.jsx";
import TextArea from "../TextArea.jsx";
import FinishTaskButton from "../../Button/FinishTask/FinishTaskButton.jsx";
import FilesButton from "../../Button/Files/FilesButton.jsx";
import DateTag from "../Date/DateTag.jsx";

const Modal = ({ card, setSelectedCard, updateCard, deleteCard, listId }) => {
  const [title, setTitle] = useState(card.title);
  const [text, setText] = useState(card.text);
  const [priority, setPriority] = useState(card.priority);
  const [date, setDate] = useState(card.date);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDirty, setIsDirty] = useState(false); // Estado para rastrear alterações

  // Detecta o tamanho da tela
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Função para fechar o modal
  const handleClose = () => {
    setSelectedCard(null);
  };

// Inicializa os estados internos apenas quando o card prop muda
useEffect(() => {
  setTitle(card.title);
  setText(card.text);
  setPriority(card.priority);
  setDate(card.date);
  setIsDirty(false); // Reseta o estado "dirty" ao abrir um novo card
}, [card]); // Dependência: card

// Atualiza o estado "dirty" quando qualquer campo é alterado
useEffect(() => {
  if (
    title !== card.title ||
    text !== card.text ||
    priority !== card.priority ||
    date !== card.date
  ) {
    setIsDirty(true); // Marca como "dirty" se houver alterações
  } else {
    setIsDirty(false); // Marca como "não dirty" se não houver alterações
  }
}, [title, text, priority, date]); // Dependências: campos do card

  

// Função para salvar as alterações
const handleSave = async () => {
  try {
    const updatedData = {
      title: title,
      description: text,
      priority: this.mapPriorityToNumber(priority),
      finishAt: date ? new Date(date).toISOString() : null,
      listId: listId
    };

    const response = await api.updateTask(card.id, updatedData);
    
    updateCard({
      ...card,
      ...response.data,
      priority: this.mapPriority(response.data.priority),
      date: response.data.finishAt ? new Date(response.data.finishAt).toISOString().split('T')[0] : '',
    });
    
    setIsDirty(false);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
  }
};

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false);
    }
  };

  // Abre o modal de confirmação
  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  // Confirma a exclusão do card
  const handleConfirmDelete = async () => {
    try {
      await api.deleteTask(card.id);
      deleteCard(card.id, listId);
      setIsConfirmingDelete(false);
      setSelectedCard(null);
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  // Cancela a exclusão do card
  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };


  // Componente para formatar a data corretamente
  const formatDate = (dateString) => {
    if (!dateString) return "";
  
    // Divide a string no formato "YYYY-MM-DD" ou "DD/MM/YYYY"
    const parts = dateString.includes("-") ? dateString.split("-") : dateString.split("/");
    
    let year, month, day;
    
    if (dateString.includes("-")) {
      // Formato "YYYY-MM-DD"
      [year, month, day] = parts;
    } else {
      // Formato "DD/MM/YYYY"
      [day, month, year] = parts;
    }
  
    // Criando a data sem considerar fuso horário
    const dateObj = new Date(year, month - 1, day);
  
    const monthName = dateObj.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""); 
  
    return `${day} ${monthName}, ${year}`;
  };

  // Versão para Desktop
  const DesktopModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Título editável */}
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            className="editable-title-input"
          />
        ) : (
          <div style={{ display: "flex", alignItems: "center",justifyContent:"space-between", gap: "10px" }}>
            <CloseTaskButton onClick={handleClose} />
            <FinishTaskButton/>
          </div>
        )}
        <div>
          <h2 onClick={handleTitleClick}>{title}</h2>
        </div>

        <hr />

        {/* Data */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p>Data de conclusão</p>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <span>{formatDate(date)}</span>
        </div>

        {/* Prioridade */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p>Prioridade</p>
          <PriorityDropdown priority={priority} setPriority={setPriority} />
        </div>

        <hr />

        {/* Descrição */}
        <p>Descrição</p>
        <TextArea value={text} onChange={setText} /> {/* Usando o TextArea corrigido */}

        <hr />
        {/* Arquivos */}
        <div>
          <p>Arquivos</p>
          <FilesButton 
            taskId={selectedCard.id} 
            updateCard={() => {
              // Lógica para atualizar o card após upload
              const updatedCard = { ...selectedCard };
              updateCard(updatedCard);
            }}
          />
        </div>

        <hr/>

        {/* Botão de exclusão */}
        <DeleteButton onClick={handleDeleteClick} />


        {/* Modal de Confirmação de Exclusão */}
        {isConfirmingDelete && (
          <ConfirmDeleteModal
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}

        {/* Botão "Salvar" condicional */}
        {isDirty && (
          <button onClick={handleSave}>Salvar</button>
        )}
      
      </div>
    </div>
  );

  // Versão para Mobile
  const MobileModal = () => (
    <div className="modal-overlay-mobile">
      <div className="modal-content-mobile">
        {/* Título editável */}
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <CloseTaskButton onClick={handleClose} />
          <FinishTaskButton />
        </div>

        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            className="editable-title-input-mobile"
          />
        ) : (
          <div style={{fontWeight:"700",fontSize:"27.65px", display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 onClick={handleTitleClick}>{title}</h2>
          </div>
        )}

        <hr />
        
        {/* Data */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p>Data de conclusão</p>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <span>{formatDate(date)}</span>
        </div>

        {/* Prioridade */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p style={{ fontSize:"16px",fontWeight:"600"}}>Prioridade</p>
          <PriorityDropdown priority={priority} setPriority={setPriority} />
        </div>

        <hr />

        {/* Descrição */}
        <div>
        <p style={{ fontSize:"16px",fontWeight:"600"}}>Descrição</p>
        <TextArea value={text} onChange={setText} /> {/* Usando o TextArea corrigido */}
        </div>
        <hr />

        <hr />
        {/* Arquivos */}
        <div>
          <p>Arquivos</p>
          <FilesButton 
            taskId={selectedCard.id} 
            updateCard={() => {
              // Lógica para atualizar o card após upload
              const updatedCard = { ...selectedCard };
              updateCard(updatedCard);
            }}
          />
        </div>

        <hr/>

        {/* Botão de exclusão */}
        <DeleteButton onClick={handleDeleteClick} />


        {/* Modal de Confirmação de Exclusão */}
        {isConfirmingDelete && (
          <ConfirmDeleteModal
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}

        {/* Botão "Salvar" condicional */}
        {isDirty && (
          <button onClick={handleSave}>Salvar</button>
        )}
        
      </div>
    </div>
  );

  return isMobile ? <MobileModal /> : <DesktopModal />;
};

// Componente do modal de confirmação
const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-delete-overlay-mobile">
      <div className="confirm-delete-modal-mobile">
        <div className="cancelButton-mobile">
          <button onClick={onCancel} className="cancel-button-mobile">
            <img src={closeIcon} alt="Fechar" />
          </button>
        </div>
        <h3 style={{ textAlign: "left", fontSize: "19.2px", margin: "0px" }}>
          Tem certeza que deseja excluir esta tarefa?
        </h3>
        <h4 style={{ textAlign: "left", fontSize: "16px", marginTop: "15px", marginBottom:"10px" }}>
          Essa ação não é reversível
        </h4>

        <div className="confirm-delete-buttons-mobile">
          <DeleteButton onClick={onConfirm} className="confirm-button-mobile" />
        </div>
      </div>
    </div>
  );
};

export default Modal;