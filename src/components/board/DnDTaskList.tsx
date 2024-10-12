import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ITaskList } from "../../interfaces/tasklist";
import { IOutletContext } from "../../interfaces/outletContext";
import { baseUrl } from "../../config";

import TaskList from "./TaskList";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../../utils/utils";

function DnDTaskList({ list }: { list: ITaskList }) {
  const { setIsUserRefresh } = useOutletContext<IOutletContext>();
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  // useEffect(() => {
  //   const el = ref.current;
  //   invariant(el);

  //   return draggable({
  //     element: el,
  //     onDragStart: () => setDragging(true),
  //     onDrop: () => setDragging(false),
  //   });
  // }, []);

  async function handleDeleteList() {
    try {
      const token = localStorage.getItem("token");
      const URL = `${baseUrl}/tasklists/${list.id}/`;
      await axios.delete(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsUserRefresh(true);
      toast({
        message: `Task List deleted`,
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        const message = getAxiosErrorMessage(e);
        toast({
          message: message,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      }
    }
  }

  return (
    <div className="box" style={dragging ? { opacity: 0.4 } : {}}>
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h6 className="is-size-6">{list.name}</h6>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <button className="delete" onClick={handleDeleteList}></button>
          </div>
        </div>
      </nav>

      <TaskList list_id={list.id} />
    </div>
  );
}

export default DnDTaskList;
