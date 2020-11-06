import React from "react";
import { Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/trainings">Trainings</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
        </ul>
      </nav>

      {props.children}
    </div>
  );
};

export default Layout;
