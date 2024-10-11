import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";

function Task({ list_id }: { list_id: number }) {
  const { user } = useOutletContext<IOutletContext>();

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

  return (
    <>
      {tasks?.map((task) => {
        return (
          <div
            key={task.id}
            className="card has-background-white-ter task-card"
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
                    `Due Date: ${new Date(task.due_date).toLocaleString(
                      "en-GB"
                    )}`}
                </h5>
              </div>
              <div className="content">
                <div className="tags">
                  {task.tags.map((tag) => {
                    return (
                      <span key={tag.id} className="tag is-link">
                        {tag.name}
                        <button className="delete is-small"></button>
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
                    <div className="has-text-success">Mark as done</div>
                  </a>
                  <a href="#" className="card-footer-item">
                    Edit
                  </a>
                </>
              )}

              <a href="#" className="card-footer-item">
                <div className="has-text-danger">Delete</div>
              </a>
            </footer>
          </div>
        );
      })}
      <button className="button is-ghost">Add new task +</button>
    </>
  );
}

export default Task;
