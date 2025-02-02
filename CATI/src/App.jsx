import React, { useState, useEffect } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import EditableListTitle from "./EditableListTitle.jsx";

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

  const handleDragEnd = (result) => {
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
  };

  const addNewList = () => {
    const newListId = crypto.randomUUID();
    const newList = { id: newListId, title: `Nova Lista ${newListId.slice(0, 5)}`, cards: [] };
    setLists([...lists, newList]);
  };

  const addNewCard = (listId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: [
                ...list.cards,
                {
                  id: crypto.randomUUID(),
                  title: `Nova Tarefa`,
                  text: "",
                  priority: "low",
                  date: "",
                },
              ],
            }
          : list
      )
    );
  };

  const deleteList = (listId) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
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