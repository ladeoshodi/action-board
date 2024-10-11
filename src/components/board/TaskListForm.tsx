import { ChangeEvent, FormEvent, forwardRef, useState } from "react";
import { baseUrl } from "../../config";
import { ITaskList } from "../../interfaces/tasklist";
import axios, { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../../utils/utils";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";

const TaskListForm = forwardRef<HTMLFormElement>(function TaskListForm(_, ref) {
  const initialFormData = {
    name: "",
  };
  const { user, setIsUserRefresh } = useOutletContext<IOutletContext>();
  const [formData, setFormData] = useState(initialFormData);

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
    <form onSubmit={handleSubmit} className="hidden" ref={ref}>
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
  );
});

export default TaskListForm;
