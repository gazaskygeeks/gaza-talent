import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./pages";

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
      </main>
    );
  }
}

export default App;
