import { ITask } from "../../interfaces/task";

function Task({ task }: { task: ITask }) {
  return (
    <div className="card has-background-white-ter task-card">
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
}

export default Task;
