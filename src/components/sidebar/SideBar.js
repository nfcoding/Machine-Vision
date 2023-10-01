import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaperPlane, faHome } from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

const SideBar = ({ isOpen, toggle }) => {
  const location = useLocation();

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem style={{ width: "100%" }}>
            <NavLink tag={Link} to={"/"} id="sidebar-link" style={location.pathname === "/" ? { backgroundColor: "#46484b" } : {}}>
              <div className="d-flex justify-content-center">
                <FontAwesomeIcon icon={faHome} size="2x" className="text-center" />
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/user"} id="sidebar-link" style={location.pathname === "/user" ? { backgroundColor: "#46484b" } : {}}>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              User
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/post"} id="sidebar-link" style={location.pathname === "/post" ? { backgroundColor: "#46484b" } : {}}>
              <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
              Post
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
