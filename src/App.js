import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { Helmet } from "react-helmet";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Container } from "@material-ui/core";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <div className="App">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Memories Application</title>
            <meta
              name="description"
              content="This is most generous application for the Memories application"
            />
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={<Navigate replace={true} to="/posts" />}
            />
            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" exact element={<PostDetails />} />
            <Route
              path="/auth"
              exact
              element={
                !user ? <Auth /> : <Navigate to="/posts" replace={true} />
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
