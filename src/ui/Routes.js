import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { Home, NotFound, MoviesList, MovieDetails, WantToWatch } from "./views";

const Routes = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/category/:category/:name"
            component={MoviesList}
          />
          <Route exact path="/detail" component={MovieDetails} />
          <Route exact path="/want-to-watch" component={WantToWatch} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default Routes;
