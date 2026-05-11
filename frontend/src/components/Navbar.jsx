import { useNavigate } from "react-router-dom";

import "./Layout.css";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <div className="navbar">

      <div>

        Welcome Back 👋
      </div>

      <div className="nav-right">

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;;