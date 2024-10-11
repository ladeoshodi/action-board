import { useEffect, useRef, useState } from "react";
import TaskList from "./TaskList";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ITaskList } from "../../interfaces/tasklist";

function DragabbleTaskList({ list }: { list: ITaskList }) {
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
      <TaskList list_id={list.id} />
    </div>
  );
}

export default DragabbleTaskList;
