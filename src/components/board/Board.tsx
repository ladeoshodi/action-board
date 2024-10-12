import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";
import TaskList from "./TaskList";
import SubmitForm from "./SubmitForm";

function Board() {
  const { user } = useOutletContext<IOutletContext>();
  const formRef = useRef<HTMLFormElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${(user?.lists.length ?? 0) + 1}, 1fr)`,
    gap: "10px",
  };

  function showForm() {
    formRef.current?.classList.toggle("hidden");
  }

  return (
    <section className="section">
      <div className="box">
        <p>Main Board</p>
        <div>
          <button
            className="button is-ghost vert-add-list-button"
            onClick={showForm}
          >
            Add new list +
          </button>
          <SubmitForm ref={formRef} />
        </div>
      </div>
      <div className="board vert-board" style={gridStyle}>
        {user?.lists.map((list) => {
          return (
            <div key={list.id}>
              <TaskList
                list={list}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Board;
