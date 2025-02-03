import React, { useState, useEffect } from "react";
import "./App.css";
/*---------Drag e Drop----------- */
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
/*---------Drag e Drop----------- */

/*-----botões------- */
import CloseTaskButton from "./Button/CloseTask/CloseTaskButton.jsx";
import ProfileButton from "./Button/Profile/ProfileButton.jsx";
import NewTaskButton from "./Button/NewTask/NewTaskButton.jsx";
import NotificationButton from "./Button/Notification/NotificationButton.jsx";
import ListOptionsButton from "./Button/ListOptions/ListOptionsButton.jsx";
import FinishTaskButton from "./Button/FinishTask/FinishTaskButton.jsx";
import FileButton from "./Button/File/FileButton.jsx";
import DeleteButton from "./Button/Delete/DeleteButton.jsx";
import NewListButton from "./Button/NewList/NewListButton.jsx";
/*-----botões------- */

/*-----Tags -----*/
import PriorityTagMid from "./Components/PriorityTag/PriorityTagMid.jsx";
import PriorityTagLow from "./Components/PriorityTag/PriorityTagLow.jsx";
import PriorityTagHigh from "./Components/PriorityTag/PriorityTagHigh.jsx";
import PriorityTagVHigh from "./Components/PriorityTag/PriorityTagVHigh.jsx";
import DateTag from "./Components/Date/DateTag.jsx";
/*-----Tags -----*/

/*-----Modal de confirmação de deletar LISTA-----*/
import ConfirmDeleteModal from "./Components/Modal/DeleteConfirmationModal.jsx"
/*-----Modal de confirmação de deletar LISTA-----*/
import ListOptionsMenu from "./Button/ListOptions/ListOptionMenu.jsx";


/*Componente para lidar com o título editável*/
const EditableListTitle = ({ list, updateListTitle, addNewCard, setSelectedCard, deleteList, isMobile}) => {
    const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
    const [title, setTitle] = useState(list.title); // Título local
    const [isOptionsVisible, setIsOptionsVisible] = useState(false); // Controla a visibilidade da aba de opções
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false); // Estado para controlar o ConfirmDeleteModal
    const [listToDelete, setListToDelete] = useState(null); // Armazena o ID da lista a ser deletada
  
    // useEffect para debug e monitoramento
    useEffect(() => {
      console.log("O componente EditableListTitle foi montado!");
    }, []); // Executa apenas na montagem do componente
  
    const handleSave = async () => {
      try {
        await api.updateList(list.id, title);
        updateListTitle(list.id, title);
        setIsEditing(false);
      } catch (error) {
        console.error('Erro ao atualizar lista:', error);
      }
    };
  
    const handleRename = () => {
      setIsEditing(true); // Ativa o modo de edição
      setIsOptionsVisible(false); // Fecha a aba de opções
    };
  
    const handleDelete = () => {
      if (listToDelete) {
        console.log(`Tentando apagar a lista ${listToDelete}`); // Debug
        deleteList(listToDelete); // Apaga a lista
        setIsOptionsVisible(false); // Fecha a aba de opções
        setShowConfirmDeleteModal(false); // Fecha o modal
        setListToDelete(null); // Limpa o estado
      }
    };
  
    // Atualiza o estado ao clicar no botão de deletar
    const handleDeleteClick = (id) => {
      console.log(`Botão de deletar clicado! ID da lista: ${id}`); // Debug
      setListToDelete(id);
      setShowConfirmDeleteModal(true);
    };
  
    const handleCloseOptions = () => {
      setIsOptionsVisible(false); // Fecha a aba de opções
    };
  
  
    const DesktopEditableListTitle = () => (
      <div className="list">
        {/*Parte de LISTA */}
        <div className="list-header">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
              className="edit-input"
            />
          ) : (
            <h3 onClick={() => setIsEditing(true)}>{list.title}</h3> // Alterna para modo de edição ao clicar
          )
          }
  
          <ListOptionsButton
            onClick={() => setIsOptionsVisible(!isOptionsVisible)}
            onRename={() => handleRename(list.id)}
            onDelete={() => {
              setListToDelete(list.id); // Armazena o ID da lista a ser deletada
              setShowConfirmDeleteModal(true); // Abre o modal de confirmação
            }}
          />
        </div>
  
                              {/*--------------- Aba de opções ---------------*/}
        
        {isOptionsVisible && (
          <ListOptionsMenu
            onRename={handleRename}
            onDelete={() => handleDeleteClick(list.id)} //aqui ele tem que abrir o ConfirmDeleteModal
          />
        )}
      
        {showConfirmDeleteModal && (
          <ConfirmDeleteModal 
            onConfirm={() => {
              if (listToDelete !== null) {
                handleDelete(listToDelete); // Deleta a lista correta
                setShowConfirmDeleteModal(false); // Fecha o modal
                setListToDelete(null); // Reseta o estado
              }
            }} 
            onCancel={() => {
              setShowConfirmDeleteModal(false);
              setListToDelete(null); // Reseta o estado caso o usuário cancele
            }} 
          />
        )}
  
        <Droppable droppableId={list.id}>
          {(provided) => {
            console.log("Renderizando Droppable com ID:", list.id);// Debug
            return(
            <div
              className="cards"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {list.cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="card"
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setSelectedCard(card);
                      }}
                    >
  
                      <div className="topcard">
  
                        <div>
                          {card.priority === "low" && <PriorityTagLow />}
                          {card.priority === "mid" && <PriorityTagMid />}
                          {card.priority === "high" && <PriorityTagHigh />}
                          {card.priority === "vhigh" && <PriorityTagVHigh />}
                        </div>
  
                        <div>
                          <FinishTaskButton />
                        </div>
  
                      </div>
  
                      <div>
                        <h3 style={{ marginBottom: 0, marginTop: 0 }}>{card.title}</h3>
                        <h4 className="textbox">{card.text}</h4>
                      </div>
  
                      <div>
                        <DateTag date={card.date} />
                      </div>
  
                    </div>
                  )}
                </Draggable>
              ))}
                                      {/* Adiciona um placeholder manual se a lista estiver vazia */}
              {list.cards.length === 0 && (
                <div
                  style={{
                    minHeight: "50px", 
                    border: "2px dashed #ccc", 
                    borderRadius: "4px",
                    margin: "8px 0",
                    textAlign: "center",
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                  }}
                >
                  Solte o card aqui
                </div>
              )}
              {provided.placeholder}
            </div>
            )
            }}
        </Droppable>
                        {/*----------Parte de CARDS----------*/}
        <div>
          <NewTaskButton onClick={() => addNewCard(list.id)} />
        </div>
      </div>
    );
  
    const MobileEditableListTitle = () => (
      <div className="listMobile">
        {/*Parte de LISTA */}
        <div className="list-headerMobile">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
              className="edit-inputMobile"
            />
          ) : (
            <h3 onClick={() => setIsEditing(true)}>{list.title}</h3> // Alterna para modo de edição ao clicar
          )
          }
  
          <ListOptionsButton
            onClick={() => setIsOptionsVisible(!isOptionsVisible)}
            onRename={() => handleRename(list.id)}
            onDelete={() => {
              setListToDelete(list.id); // Armazena o ID da lista a ser deletada
              setShowConfirmDeleteModal(true); // Abre o modal de confirmação
            }}
          />
        </div>
  
                              {/*--------------- Aba de opções ---------------*/}
        
        {isOptionsVisible && (
          <ListOptionsMenu
            onRename={handleRename}
            onDelete={() => handleDeleteClick(list.id)} //aqui ele tem que abrir o ConfirmDeleteModal
          />
        )}
      
        {showConfirmDeleteModal && (
          <ConfirmDeleteModal 
            onConfirm={() => {
              if (listToDelete !== null) {
                handleDelete(listToDelete); // Deleta a lista correta
                setShowConfirmDeleteModal(false); // Fecha o modal
                setListToDelete(null); // Reseta o estado
              }
            }} 
            onCancel={() => {
              setShowConfirmDeleteModal(false);
              setListToDelete(null); // Reseta o estado caso o usuário cancele
            }} 
          />
        )}
  
        <Droppable droppableId={list.id}>
        {(provided) => {
            console.log("Renderizando Droppable com ID(list.id):", list.id); // Debug
            return (
            <div
                className="cards"
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                {list.cards.map((card, index) => {
                console.log("Renderizando Draggable com ID (card.id):", card.id); // Debug
                return (
                    <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                    {(provided) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="card"
                        onContextMenu={(e) => {
                            e.preventDefault();
                            setSelectedCard(card);
                        }}
                        >
                        <div className="topcard">
                            <div>
                            {card.priority === "low" && <PriorityTagLow />}
                            {card.priority === "mid" && <PriorityTagMid />}
                            {card.priority === "high" && <PriorityTagHigh />}
                            {card.priority === "vhigh" && <PriorityTagVHigh />}
                            </div>
                            <div>
                            <FinishTaskButton />
                            </div>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: 0, marginTop: 0 }}>{card.title}</h3>
                            <h4 className="textbox">{card.text}</h4>
                        </div>
                        <div>
                            <DateTag date={card.date} />
                        </div>
                        </div>
                    )}
                    </Draggable>
                );
                })}
                {provided.placeholder}
            </div>
            );
        }}
        </Droppable>
                        {/*----------Parte de CARDS----------*/}
        <div>
          <NewTaskButton onClick={() => addNewCard(list.id)} />
            
        </div>
      </div>
    );
    return isMobile ? <MobileEditableListTitle /> : <DesktopEditableListTitle />;
}

export default EditableListTitle;