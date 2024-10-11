import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";
import Task from "./Task";
import { useRef } from "react";
import SubmitForm from "./SubmitForm";

function TaskList({ list_id }: { list_id: number }) {
  const { user } = useOutletContext<IOutletContext>();
  const formRef = useRef<HTMLFormElement>(null);

  const tasks = user?.tasks
    .filter((task) => task.task_list.id === list_id)
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

  return (
    <>
      <button className="button is-ghost pb-3" onClick={showForm}>
        Add new task +
      </button>
      <div className="pb-4">
        <SubmitForm ref={formRef} list_id={list_id} />
      </div>
      {tasks?.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </>
  );
}

export default TaskList;
