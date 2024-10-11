import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ITaskList } from "../../interfaces/tasklist";
import Task from "./Task";

function TaskList({ list }: { list: ITaskList }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  return (
    <div className="box" style={dragging ? { opacity: 0.4 } : {}} ref={ref}>
      <h6 className="is-size-6 pb-3">{list.name}</h6>
      <Task list_id={list.id} />
    </div>
  );
}

function VertBoardView() {
  const { user } = useOutletContext<IOutletContext>();
  console.log(user);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${(user?.lists.length ?? 0) + 1}, 1fr)`,
    gap: "10px",
  };

  return (
    <div className="board vert-board" style={gridStyle}>
      {user?.lists.map((list) => {
        return (
          <div key={list.id}>
            <TaskList list={list} />
          </div>
        );
      })}
    </div>
  );
}

export default VertBoardView;
