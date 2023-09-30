import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaperPlane, faHome } from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3 className="d-flex justify-content-center">
        <FontAwesomeIcon icon={faHome} />
      </h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <NavItem>
          <NavLink tag={Link} to={"/"} id="sidebar-link">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            User
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/post"} id="sidebar-link">
            <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
            Post
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

export default SideBar;
