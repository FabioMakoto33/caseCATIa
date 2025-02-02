import './ListOptionMenu.module.css';

const ListOptionsMenu = ({ onRename, onDelete }) => {
    return (
      <div className="list-options-menu">
        <button onClick={onRename}>Renomear</button>
        <button onClick={onDelete}>Deletar</button>
        
      </div>
    );
  };

export default ListOptionsMenu;