import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import User from "./pages/User";
import { Fragment } from "react";
import Content from "./components/content/Content";
import SideBar from "./components/sidebar/SideBar";
import "./App.css";

function App() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  return (
    <Router>
      <Fragment>
        <div className="App wrapper">
          <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
          <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
        </div>
        <Routes>
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/user" element={<User />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
