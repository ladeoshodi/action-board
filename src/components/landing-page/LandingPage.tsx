import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

import "../../styles/LandingPage.css";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Automatically log the user still signed in
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="body-content landing-page">
      <section className="logo-image">
      </section>
      <div className="">
        {showLogin ? (
          <Login setShowLogin={setShowLogin} />
        ) : (
          <Register setShowLogin={setShowLogin} />
        )}
      </div>
    </div>
  );
}

export default LandingPage;
