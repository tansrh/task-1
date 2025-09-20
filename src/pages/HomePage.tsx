import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import "../App.scss";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("authUser") || "null");

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/auth/login");
  };

  return (
    <div className="home-page">
      <div className="home-content">
        <PageHeading
        />
        <div className="user-section">
          <img src="/user.svg" alt="User" className="user-icon" />
          <div className="user-details">
            <div className="user-name">{`${user?.firstName} ${user?.lastName}`}</div>
            {user?.email && <div className="user-email">{user.email}</div>}
          </div>
           <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        </div>
       
      </div>
    </div>
  );
};

export default HomePage;
