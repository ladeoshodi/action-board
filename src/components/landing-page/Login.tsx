import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "bulma-toast";
import { useNavigate } from "react-router-dom";
import { ILoginApiResponse } from "../../interfaces/api";
import { getAxiosErrorMessage } from "../../utils/utils";
import { baseUrl } from "../../config";

interface LoginProps {
  setShowLogin: (showLogin: boolean) => void;
}

function Login({ setShowLogin }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    try {
      const URL = `${baseUrl}/user/login/`;
      const response = await axios.post<ILoginApiResponse>(URL, formData);

      // save the token on successful login
      localStorage.setItem("token", response.data.token);

      // redirect to home
      navigate("/home");

      toast({
        message: response.data.message,
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });
    } catch (e: unknown) {
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
    const targetElement = e.target.name;
    const newFormData = {
      ...formData,
      [targetElement]: e.target.value,
    };
    setFormData(newFormData);
  }

  return (
    <section className="section">
      <p className="title has-text-grey-dark is-size-5">Login</p>
      <form
        aria-label="login-form"
        className="box ps-form"
        onSubmit={(e) => {
          void handleLogin(e);
        }}
      >
        <div className="field">
          <label htmlFor="email" className="label has-text-grey-dark">
            Email
          </label>
          <div className="control has-icons-left">
            <input
              id="email"
              className="input"
              type="text"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="password" className="label has-text-grey-dark">
            Password
          </label>
          <div className="control has-icons-left">
            <input
              id="password"
              className="input"
              type="text"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-key"></i>
            </span>
          </div>
        </div>
        <button className="button">Login</button>
      </form>
      <p
        className="hover-pointer"
        onClick={() => {
          setShowLogin(false);
        }}
      >
        Don&apos;t have an account? Click to Register
      </p>
    </section>
  );
}

export default Login;
