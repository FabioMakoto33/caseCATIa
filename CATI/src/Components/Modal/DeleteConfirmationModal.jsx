import "./DeleteConfimationModal.module.css";
import DeleteButton from "../../Button/Delete/DeleteButton";
import closeIcon from "./Close.png"

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
    return (
      <div className="confirm-delete-overlay">
        <div className="confirm-delete-modal">
        <div className="cancelButton">
          <button onClick={onCancel} className="cancel-button">     {/*Fecha o Modal*/}
            <img src={closeIcon} alt="Fechar" />
          </button>
        </div>
          <h3 style={{textAlign:"left",fontSize:"19.2px",margin:"0px"}}>Tem certeza que deseja excluir esta tarefa?</h3>
          <h4 style={{textAlign:"left",fontSize:"16px", marginTop:"20px"}}>Essa ação não é reversível</h4>

          <div className="confirm-delete-buttons">
            <DeleteButton onClick={onConfirm} className="confirm-button"/>  {/*Botão que apaga o card*/}
          </div>
        </div>
      </div>
    );
  };

  export default ConfirmDeleteModal;