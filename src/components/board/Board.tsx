import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";
import DragabbleTaskList from "./DraggabbleTaskList";
import TaskListForm from "./TaskListForm";

function Board() {
  const { user } = useOutletContext<IOutletContext>();
  const newListFormRef = useRef<HTMLFormElement>(null);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${(user?.lists.length ?? 0) + 1}, 1fr)`,
    gap: "10px",
  };

  function showForm() {
    newListFormRef.current?.classList.toggle("hidden");
  }

  return (
    <section className="section">
      <div className="box">
        <p>Main Board</p>
      </div>
      <div className="board vert-board" style={gridStyle}>
        {user?.lists.map((list) => {
          return (
            <div key={list.id}>
              <DragabbleTaskList list={list} />
            </div>
          );
        })}
        <div>
          <button
            className="button is-ghost vert-add-list-button"
            onClick={showForm}
          >
            Add new list +
          </button>
          <TaskListForm ref={newListFormRef} />
        </div>
      </div>
    </section>
  );
}

export default Board;
