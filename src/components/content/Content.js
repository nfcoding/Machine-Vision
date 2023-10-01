import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Route, Routes } from "react-router-dom";
import Post from "../../pages/Post";
import User from "../../pages/User";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container fluid className={classNames("content", { "is-open": sidebarIsOpen })}>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/user" element={<User />} />
      <Route exact path="/post" element={<Post />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Container>
);

export default Content;
