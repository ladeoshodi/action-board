import { useOutletContext } from "react-router-dom";
import { ITask } from "../../interfaces/task";
import { IOutletContext } from "../../interfaces/outletContext";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../../config";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../../utils/utils";
import { DragEvent, useRef } from "react";
import EditTaskForm from "./EditTaskForm";

interface TaskProps {
  task: ITask;
  setActiveCard: (arg: number | null) => void;
}

function TaskCard({ task, setActiveCard }: TaskProps) {
  const { setIsUserRefresh } = useOutletContext<IOutletContext>();
  const editTaskFormRef = useRef<HTMLDivElement>(null);

  async function markTaskAsDone() {
    try {
      const token = localStorage.getItem("token");
      const URL = `${baseUrl}/tasks/${task.id}/`;

      const response = await axios.put<ITask>(
        URL,
        { done: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsUserRefresh(true);
      toast({
        message: `${response.data.name} completed`,
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

  async function deleteTask() {
    try {
      const token = localStorage.getItem("token");
      const URL = `${baseUrl}/tasks/${task.id}/`;

      await axios.delete(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsUserRefresh(true);
      toast({
        message: `Task deleted`,
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

  function dragStart(e: DragEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    target.style.opacity = "0.4";
    setActiveCard(task.id);
  }

  function dragEnd(e: DragEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    target.style.opacity = "1";
    setActiveCard(null);
  }

  function handleDrag(e: DragEvent<HTMLDivElement>) {
    const scrollThreshold = 50;
    const scrollSpeed = 10;

    if (e.clientY < scrollThreshold) {
      window.scrollBy(0, -scrollSpeed);
    } else if (window.innerHeight - e.clientY < scrollThreshold) {
      window.scrollBy(0, scrollSpeed);
    }
  }

  function showEditForm() {
    editTaskFormRef.current?.classList.add("is-active");
  }

  function closeEditForm() {
    editTaskFormRef.current?.classList.remove("is-active");
  }

  return (
    <div
      className="card task-card mb-5"
      draggable
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDrag={handleDrag}
    >
      <div className="card-content">
        <div className="content">
          <h5
            className="is-size-6"
            style={{
              textDecoration: task.done ? "line-through" : "none",
            }}
          >
            {task.name}
          </h5>
        </div>
        <div className="content">
          <h5 className="is-size-7 has-text-weight-medium">
            {task.description}
          </h5>
        </div>
        <div className="content">
          <h5 className="is-size-7 has-text-danger has-text-weight-light">
            {task.due_date &&
              `Due Date: ${new Date(task.due_date).toLocaleString("en-GB")}`}
          </h5>
        </div>
        <div className="content">
          <div className="tags">
            {task.tags.map((tag) => {
              return (
                <span key={tag.id} className="tag is-darker">
                  {tag.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <footer className="card-footer">
        {!task.done && (
          <>
            <a href="#" className="card-footer-item">
              <div className="has-text-success" onClick={markTaskAsDone}>
                Mark as done
              </div>
            </a>
            <a href="#" className="card-footer-item" onClick={showEditForm}>
              Edit
            </a>
            <EditTaskForm
              ref={editTaskFormRef}
              closeEditForm={closeEditForm}
              task={task}
            />
          </>
        )}
        <a href="#" className="card-footer-item">
          <div className="has-text-danger" onClick={deleteTask}>
            Delete
          </div>
        </a>
      </footer>
    </div>
  );
}

export default TaskCard;
