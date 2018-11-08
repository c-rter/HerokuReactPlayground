import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import HallofFame from "./pages/HallofFame";
import HallofShame from "./pages/HallofShame";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/goals" component={Goals} />
        <Route exact path="/halloffame" component={HallofFame} />
        <Route exact path="/hallofshame" component={HallofShame} />
        <Route exact path="/goals/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
