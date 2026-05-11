import { Link } from "react-router-dom";

import "./Layout.css";

function Sidebar() {

  return (

    <div className="sidebar">

      <h2 className="logo">
        Tracker
      </h2>

      <nav>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/analytics">
          Analytics
        </Link>

        <Link to="/board">
          Kanban Board
        </Link>

        <Link to="/resume">
        Resume Upload
        </Link>

        <Link to="/add">
        Add Application
        </Link>

        <Link to="/profile">
        My Profile
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;