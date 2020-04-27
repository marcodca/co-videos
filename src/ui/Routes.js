import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  Home,
  NotFound,
  MoviesCategory,
  MovieDetails,
  WantToWatch,
} from "./views";
import styled from "styled-components";
import ScrollToTop from "./components/ScrollToTop";

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/category/:category/:name"
            component={MoviesCategory}
          />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path="/want-to-watch" component={WantToWatch} />
          <Route component={NotFound} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
};

const Main = styled.main`
  margin: 0 auto;
  margin-top: 3.6em;
  width: 75%;
  min-width: 320px;
  max-width: 900px;
  min-height: 100vh;
`;

export default Routes;
