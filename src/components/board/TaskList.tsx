import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";
import TaskCard from "./TaskCard";
import { useRef, useState } from "react";
import SubmitForm from "./SubmitForm";
import DropArea from "./DropArea";
import { baseUrl } from "../../config";
import { ITaskList } from "../../interfaces/tasklist";
import axios, { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../../utils/utils";

function TaskList({ list }: { list: ITaskList }) {
  const { user, setIsUserRefresh } = useOutletContext<IOutletContext>();
  const formRef = useRef<HTMLFormElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const tasks = user?.tasks
    .filter((task) => task.task_list.id === list.id)
    .sort((task1, task2) => {
      // sort by done status
      if (task1.done && !task2.done) return 1;
      if (!task1.done && task2.done) return -1;
      // sort by due date
      if (task1.due_date > task2.due_date) return 1;
      if (task1.due_date < task2.due_date) return -1;
      // sort - put no due dates below
      if (!task1.due_date) return 1;
      if (!task2.due_date) return -1;
      return 0;
    });

  function showForm() {
    formRef.current?.classList.toggle("hidden");
  }

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
    <div className="box">
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
      <button className="button is-ghost pb-3" onClick={showForm}>
        Add new task +
      </button>
      <div className="pb-4">
        <SubmitForm ref={formRef} list_id={list.id} />
      </div>
      <DropArea />
      {tasks?.map((task) => {
        return (
          <>
            <TaskCard key={task.id} task={task} setActiveCard={setActiveCard} />
            <DropArea />
          </>
        );
      })}
    </div>
  );
}

export default TaskList;
