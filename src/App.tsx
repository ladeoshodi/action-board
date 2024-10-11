import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "bulma-toast";

import { IUser } from "./interfaces/user";
import { getAxiosErrorMessage } from "./utils/utils";
import { baseUrl } from "./config";

import NavBar from "./components/home/NavBar";

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchUser() {
      try {
        const URL = `${baseUrl}/user/`;
        const response = await axios.get<IUser>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
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
        // navigate back to landing page if error in getting user
        navigate("/");
      }
    }
    if (token) {
      void fetchUser();
    } else {
      // navigate back to landing page if no token
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <NavBar user={user} />
      <div className="body-content">
        <Outlet context={{ user }} />
      </div>
    </>
  );
}

export default App;
