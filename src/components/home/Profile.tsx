import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
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

  async function deleteTag(e: MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement;
    const tag_id = target.dataset.tagId;
    try {
      const token = localStorage.getItem("token");

      const URL = `${baseUrl}/tags/${tag_id}/`;
      await axios.delete(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsUserRefresh(true);
      toast({
        message: `Tag deleted`,
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
      <section className="section has-text-dark">
        <h1 className="title has-text-dark">User Profile</h1>
        <div className="columns">
          <div className="column is-two-fifths">
            <h5 className="is-size-5">
              <span className="has-text-weight-bold">Username:</span>{" "}
              {user?.username}
            </h5>
            <h5 className="is-size-5">
              <span className="has-text-weight-bold">Email:</span> {user?.email}
            </h5>
            <h5 className="is-size-5">
              <span className="has-text-weight-bold">First Name:</span>{" "}
              {user?.first_name}
            </h5>
            <h5 className="is-size-5">
              <span className="has-text-weight-bold">Last Name:</span>{" "}
              {user?.last_name}
            </h5>
          </div>
          <div className="column">
            <figure className="image is-128x128">
              <img
                src={
                  user?.profile_img ??
                  "https://bulma.io/assets/images/placeholders/128x128.png"
                }
              />
            </figure>
          </div>
        </div>
      </section>
      <hr />
      <section className="section">
        <h1 className="title has-text-dark">Tags</h1>
        {user?.tags.map((tag) => {
          return (
            <div key={tag.id}>
              <span className="tag is-link is-large mb-3">
                {tag.name}{" "}
                <button
                  className="delete"
                  data-tag-id={tag.id}
                  onClick={deleteTag}
                ></button>
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
