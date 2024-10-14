import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";
import { ChangeEvent, FormEvent, useState } from "react";
import { baseUrl } from "../../config";
import axios, { AxiosError } from "axios";
import { ITag } from "../../interfaces/tag";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../../utils/utils";

function Profile() {
  const { user, setIsUserRefresh } = useOutletContext<IOutletContext>();
  const initialFormData = {
    name: "",
  };
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

      const URL = `${baseUrl}/tags/`;
      const response = await axios.post<ITag>(URL, formData, {
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
    <div className="body-center-content">
      <section className="section">
        <h1 className="title has-text-dark">User Profile</h1>
      </section>
      <section className="section">
        <h1 className="title has-text-dark">Tags</h1>
        {user?.tags.map((tag) => {
          return (
            <div key={tag.id}>
              <span className="tag is-link is-large mb-3">
                {tag.name} <button className="delete"></button>
              </span>
            </div>
          );
        })}
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="field">
            <div className="control">
              <input
                id="name"
                className="input tag-input has-text-dark"
                type="text"
                placeholder="Create New Tag"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Profile;
