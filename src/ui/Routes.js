import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { Home, NotFound, MoviesList, MovieDetails, WantToWatch } from "./views";
import styled from "styled-components";
import ScrollToTop from "./components/ScrollToTop";

const Routes = () => {
  return (
    <Router>
      <ScrollToTop/>
        <Header />
        <Main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/category/:category/:name"
              component={MoviesList}
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
  min-height: calc(100vh - 3.5em);
`;

export default Routes;
