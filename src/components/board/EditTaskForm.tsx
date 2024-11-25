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

interface IinitialFormData {
  name: string;
  description: string;
  due_date?: string;
  tags?: string[];
}

const EditTaskForm = forwardRef<HTMLDivElement, EditTaskFormProp>(
  function EditTaskForm({ closeEditForm, task }, ref) {
    const { user, setShouldRefreshUser } = useOutletContext<IOutletContext>();

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const initialFormData: IinitialFormData = {
      name: task.name,
      description: task.description || "",
      due_date: task.due_date ? formatDate(task.due_date) : "",
      tags: task.tags.map((tag) => String(tag.id)),
    };

    const [formData, setFormData] = useState(initialFormData);

    async function updateTask(e: FormEvent) {
      e.preventDefault();
      try {
        const updatedFormData = { ...formData };
        if (!updatedFormData.due_date) {
          delete updatedFormData.due_date;
        }
        const token = localStorage.getItem("token");
        const URL = `${baseUrl}/tasks/${task.id}/`;
        await axios.put<ITask>(URL, updatedFormData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        closeEditForm();
        setShouldRefreshUser(true);
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

    function handleInputChange(
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
      const target = e.target;
      const name = target.name;
      let value: string | string[];
      if (target instanceof HTMLSelectElement && target.multiple) {
        value = Array.from(target.selectedOptions, (option) => option.value);
      } else {
        value = target.value;
      }

      const newFormData = {
        ...formData,
        [name]: value,
      };
      setFormData(newFormData);
    }

    function clearTags() {
      const newFormData = {
        ...formData,
        tags: [],
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
                      placeholder="Update Task Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label
                    htmlFor="description"
                    className="label has-text-grey-dark"
                  >
                    Update Task Description
                  </label>
                  <div className="control">
                    <textarea
                      id="description"
                      className="textarea"
                      placeholder="Update Task Description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="field">
                  <label
                    htmlFor="due_date"
                    className="label has-text-grey-dark"
                  >
                    Update Due Date
                  </label>
                  <div className="control">
                    <input
                      id="due_date"
                      className="input"
                      type="datetime-local"
                      placeholder="Update Task Description"
                      name="due_date"
                      value={formData.due_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="tags" className="label has-text-grey-dark">
                    Update Tags{" "}
                    <div className="icon is-small is-left">
                      <i className="fas fa-tag"></i>
                    </div>
                  </label>
                  <div className="control">
                    <div className="select is-multiple">
                      <select
                        id="tags"
                        multiple={true}
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          --Add or remove tags--
                        </option>
                        {user?.tags.map((tag) => {
                          return (
                            <option key={tag.id} value={tag.id}>
                              {tag.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <button
                    className="button mt-3"
                    type="button"
                    onClick={clearTags}
                  >
                    Clear Tags
                  </button>
                </div>
              </section>
              <footer className="modal-card-foot">
                <div className="buttons">
                  <button className="button is-success">Save changes</button>
                  <button
                    className="button"
                    type="button"
                    onClick={() => {
                      closeEditForm();
                      setFormData(initialFormData);
                    }}
                  >
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
