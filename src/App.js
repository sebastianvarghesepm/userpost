import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Postlist from "./postlist";
import Postedit from "./postedit";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/postedit/:id" component={Postedit}></Route>
          <Route path="/" component={Postlist}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
