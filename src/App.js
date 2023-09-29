import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import User from "./pages/Uses";
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/user" element={<User />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
