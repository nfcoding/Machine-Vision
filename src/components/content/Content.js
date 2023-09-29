import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import Post from "../../pages/Post";
import User from "../../pages/User";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container fluid className={classNames("content", { "is-open": sidebarIsOpen })}>
    <Routes>
      <Route exact path="/post" element={<Post />} />
      <Route exact path="/user" element={<User />} />
    </Routes>
  </Container>
);

export default Content;
