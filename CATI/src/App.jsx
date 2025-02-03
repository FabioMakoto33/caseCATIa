import React, { useState, useEffect } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import EditableListTitle from "./EditableListTitle.jsx";
import api from './api';

// Importe outros componentes e botões conforme necessário
import CloseTaskButton from "./Button/CloseTask/CloseTaskButton.jsx";
import ProfileButton from "./Button/Profile/ProfileButton.jsx";
import NewTaskButton from "./Button/NewTask/NewTaskButton.jsx";
import NotificationButton from "./Button/Notification/NotificationButton.jsx";
import ListOptionsButton from "./Button/ListOptions/ListOptionsButton.jsx";
import FinishTaskButton from "./Button/FinishTask/FinishTaskButton.jsx";
import FileButton from "./Button/File/FileButton.jsx";
import DeleteButton from "./Button/Delete/DeleteButton.jsx";
import NewListButton from "./Button/NewList/NewListButton.jsx";
import ProfileMobileButton from "./Button/ProfileMobile/ProfileMobileButton.jsx";

// Importe as tags e modais
import PriorityTagMid from "./Components/PriorityTag/PriorityTagMid.jsx";
import PriorityTagLow from "./Components/PriorityTag/PriorityTagLow.jsx";
import PriorityTagHigh from "./Components/PriorityTag/PriorityTagHigh.jsx";
import PriorityTagVHigh from "./Components/PriorityTag/PriorityTagVHigh.jsx";
import DateTag from "./Components/Date/DateTag.jsx";
import Modal from "./Components/Modal/Modal.jsx";
import ConfirmDeleteModal from "./Components/Modal/DeleteConfirmationModal.jsx";
import HomeButton from "./Button/Home/HomeButton.jsx";

function App() {
  const [lists, setLists] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listsResponse = await api.getLists();
        const tasksResponse = await api.getTasks();
        
        // Mapear as tasks para o formato do frontend
        const mappedLists = listsResponse.data.map(list => ({
          id: list.id,
          title: list.title,
          cards: tasksResponse.data
            .filter(task => task.listId === list.id)
            .map(task => ({
              id: task.id,
              title: task.title,
              text: task.description,
              priority: this.mapPriority(task.priority),
              date: task.finishAt ? new Date(task.finishAt).toISOString().split('T')[0] : '',
            }))
        }));
        
        setLists(mappedLists);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    
    fetchData();
  }, []);

  // Mapeamento de prioridades
  mapPriority = (priorityNumber) => {
    const priorities = ['low', 'mid', 'high', 'vhigh'];
    return priorities[priorityNumber - 1] || 'low';
  };

  // Mapeamento inverso para prioridades
  mapPriorityToNumber = (priority) => {
    const priorities = { low: 1, mid: 2, high: 3, vhigh: 4 };
    return priorities[priority] || 1;
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
  
    if (!destination) return;
  
    console.log("Source:", source);
    console.log("Destination:", destination);
    console.log("Draggable ID:", draggableId);
  
    const sourceListIndex = lists.findIndex((list) => list.id === source.droppableId);
    const destListIndex = lists.findIndex((list) => list.id === destination.droppableId);
    const sourceList = lists[sourceListIndex];
    const destList = lists[destListIndex];
    const movedCard = sourceList.cards[source.index];
  
    if (source.droppableId === destination.droppableId) {
      const updatedCards = Array.from(sourceList.cards);
      updatedCards.splice(source.index, 1);
      updatedCards.splice(destination.index, 0, movedCard);
      const updatedLists = [...lists];
      updatedLists[sourceListIndex] = { ...sourceList, cards: updatedCards };
      setLists(updatedLists);
    } else {
      const updatedSourceCards = Array.from(sourceList.cards);
      updatedSourceCards.splice(source.index, 1);
      const updatedDestCards = Array.from(destList.cards);
      updatedDestCards.splice(destination.index, 0, movedCard);
      const updatedLists = [...lists];
      updatedLists[sourceListIndex] = { ...sourceList, cards: updatedSourceCards };
      updatedLists[destListIndex] = { ...destList, cards: updatedDestCards };
      setLists(updatedLists);
    }
  
    console.log("Updated Lists:", lists); // Verifica se o estado foi atualizado corretamente
    try {
      // Atualizar a posição e lista no backend
      await api.updateTask(movedCard.id, {
        listId: destination.droppableId,
        // Adicione lógica para atualizar posição se necessário
      });
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const addNewList = async () => {
    try {
      const response = await api.createList(`Nova Lista`);
      setLists([...lists, {
        id: response.data.id,
        title: response.data.title,
        cards: []
      }]);
    } catch (error) {
      console.error('Erro ao criar lista:', error);
    }
  };

  const addNewCard = async (listId) => {
    try {
      const response = await api.createTask({
        title: 'Nova Tarefa',
        description: '',
        priority: 1,
        listId: listId,
        finishAt: null
      });

      setLists(lists.map(list =>
        list.id === listId
          ? {
              ...list,
              cards: [
                ...list.cards,
                {
                  id: response.data.id,
                  title: response.data.title,
                  text: response.data.description,
                  priority: this.mapPriority(response.data.priority),
                  date: response.data.finishAt ? new Date(response.data.finishAt).toISOString().split('T')[0] : '',
                }
              ]
            }
          : list
      ));
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const deleteList = async (listId) => {
    try {
      await api.deleteList(listId);
      setLists(prevLists => prevLists.filter(list => list.id !== listId));
    } catch (error) {
      console.error('Erro ao deletar lista:', error);
    }
  };

  const deleteCard = (cardId, listId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) }
          : list
      )
    );
  };

  const updateListTitle = (id, newTitle) => {
    setLists(
      lists.map((list) =>
        list.id === id ? { ...list, title: newTitle } : list
      )
    );
  };

  const updateCard = (updatedCard) => {
    setLists(
      lists.map((list) => ({
        ...list,
        cards: list.cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        ),
      }))
    );
  };

  const DesktopApp = () => (
    <div className="App">
      <header className="header">
        <div className="logo">
          <h1>Desktop</h1>
        </div>
        <div className="headerButtons">
          <NotificationButton />
          <ProfileButton />
        </div>
      </header>
      <main className="main-content">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="board">
            {lists.map((list) => (
              <EditableListTitle
                isMobile={isMobile}
                key={list.id}
                list={list}
                updateListTitle={updateListTitle}
                addNewCard={addNewCard}
                setSelectedCard={setSelectedCard}
                deleteList={deleteList}
              />
            ))}
            <NewListButton onClick={addNewList} />
          </div>
        </DragDropContext>
      </main>

      {selectedCard && (
        <Modal
          card={selectedCard}
          listId={lists.find((list) => list.cards.some((c) => c.id === selectedCard.id))?.id}
          setSelectedCard={setSelectedCard}
          deleteCard={deleteCard}
          updateCard={updateCard}
        />
      )}
    </div>
  );

  const MobileApp = () => (
    <div className="AppMobile">
      <header className="headerMobile">
        <div className="headerButtonsMobile">
            <HomeButton/>
          <NotificationButton />
          <ProfileMobileButton />
        </div>
      </header>
      <main className="main-contentMobile">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="boardMobile">
            {lists.map((list) => (
              <EditableListTitle
                isMobile={isMobile}
                key={list.id}
                list={list}
                updateListTitle={updateListTitle}
                addNewCard={addNewCard}
                setSelectedCard={setSelectedCard}
                deleteList={deleteList}
              />
            ))}
            <NewListButton onClick={addNewList} />
          </div>
        </DragDropContext>
      </main>

      {selectedCard && (
        <Modal
          card={selectedCard}
          listId={lists.find((list) => list.cards.some((c) => c.id === selectedCard.id))?.id}
          setSelectedCard={setSelectedCard}
          deleteCard={deleteCard}
          updateCard={updateCard}
        />
      )}
    </div>
  );

  return isMobile ? <MobileApp /> : <DesktopApp />;
}

export default App;