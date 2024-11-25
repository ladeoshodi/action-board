import { ChangeEvent, FormEvent, forwardRef, useState } from "react";
import { baseUrl } from "../../config";
import { ITaskList } from "../../interfaces/tasklist";
import axios, { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../../utils/utils";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";
import { ITask } from "../../interfaces/task";

interface SubmitFormProp {
  list_id?: number;
}

interface INewFormData {
  name: string;
  user: number | undefined;
  task_list?: number;
}

const SubmitForm = forwardRef<HTMLFormElement, SubmitFormProp>(
  function SubmitForm({ list_id }, ref) {
    const initialFormData = {
      name: "",
    };
    const { user, setShouldRefreshUser } = useOutletContext<IOutletContext>();
    const [formData, setFormData] = useState(initialFormData);

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      const target = e.target;
      const newFormData: INewFormData = {
        ...formData,
        [target.name]: target.value,
        user: user?.id,
      };

      if (list_id) {
        newFormData.task_list = list_id;
      }

      setFormData(newFormData);
    }

    async function handleSubmit(e: FormEvent) {
      e.preventDefault();

      try {
        const token = localStorage.getItem("token");
        let response;

        if (list_id) {
          const URL = `${baseUrl}/tasks/`;
          response = await axios.post<ITask>(URL, formData, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          const URL = `${baseUrl}/tasklists/`;
          response = await axios.post<ITaskList>(URL, formData, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        setShouldRefreshUser(true);
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
      <form
        onSubmit={handleSubmit}
        aria-label="submit-form"
        className="hidden"
        ref={ref}
      >
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
  }
);

export default SubmitForm;
