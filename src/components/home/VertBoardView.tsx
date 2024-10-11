import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ITaskList } from "../../interfaces/tasklist";
import TaskList from "./TaskList";
import { baseUrl } from "../../config";
import axios, { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../../utils/utils";

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

function VertBoardView() {
  const initialFormData = {
    name: "",
  };

  const { user, setIsUserRefresh } = useOutletContext<IOutletContext>();
  const newListFormRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState(initialFormData);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${(user?.lists.length ?? 0) + 1}, 1fr)`,
    gap: "10px",
  };

  function showForm() {
    newListFormRef.current?.classList.toggle("hidden");
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const newFormData = {
      ...formData,
      [target.name]: target.value,
      user: user?.id,
    };
    setFormData(newFormData);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const URL = `${baseUrl}/tasklists/`;
      const response = await axios.post<ITaskList>(URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsUserRefresh(true);
      setFormData(initialFormData);
      toast({
        message: `${response.data.name} created`,
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
        <form onSubmit={handleSubmit} className="hidden" ref={newListFormRef}>
          <div className="field">
            <div className="control">
              <input
                id="name"
                className="input"
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VertBoardView;
