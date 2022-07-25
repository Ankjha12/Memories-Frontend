import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { Helmet } from "react-helmet";


import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Memories Application</title>
          <meta name="description" content="This is most generous application for the Memories application" />
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}>
          </Route>
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
