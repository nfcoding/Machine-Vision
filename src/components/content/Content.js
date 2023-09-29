import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Navigate, Route } from "react-router-dom";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container fluid className={classNames("content", { "is-open": sidebarIsOpen })}>
    <Navigate>
      <Route exact path="/" component={() => "Hello"} />
      <Route exact path="/about" component={() => "About"} />
    </Navigate>
  </Container>
);

export default Content;
