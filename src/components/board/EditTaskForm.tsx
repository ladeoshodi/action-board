import { ChangeEvent, FormEvent, forwardRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";
import { ITask } from "../../interfaces/task";
import { baseUrl } from "../../config";
import axios, { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../../utils/utils";

interface EditTaskFormProp {
  closeEditForm: () => void;
  task: ITask;
}
const EditTaskForm = forwardRef<HTMLDivElement, EditTaskFormProp>(
  function EditTaskForm({ closeEditForm, task }, ref) {
    const { user, setIsUserRefresh } = useOutletContext<IOutletContext>();

    const currentTaskName = user?.tasks.find(
      (currentTask) => currentTask.id === task.id
    );

    const initialFormData = {
      name: currentTaskName?.name,
    };

    const [formData, setFormData] = useState(initialFormData);

    async function updateTask(e: FormEvent) {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");

        const URL = `${baseUrl}/tasks/${task.id}/`;
        await axios.put<ITask>(URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        closeEditForm();
        setIsUserRefresh(true);
        toast({
          message: "Update successful",
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

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      const target = e.target;
      const newFormData = {
        ...formData,
        [target.name]: target.value,
      };
      setFormData(newFormData);
    }

    return (
      <>
        <div className="modal" ref={ref}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Modal title</p>
            </header>
            <form
              onSubmit={(e) => {
                void updateTask(e);
              }}
            >
              <section className="modal-card-body">
                <div className="field">
                  <label htmlFor="name" className="label has-text-grey-dark">
                    Update Task Name
                  </label>
                  <div className="control">
                    <input
                      id="name"
                      className="input"
                      type="text"
                      placeholder="Enter Task Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <div className="buttons">
                  <button className="button is-success">Save changes</button>
                  <button className="button" onClick={closeEditForm}>
                    Cancel
                  </button>
                </div>
              </footer>
            </form>
          </div>
        </div>
      </>
    );
  }
);

export default EditTaskForm;
