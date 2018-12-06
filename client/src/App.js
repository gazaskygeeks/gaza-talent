import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from "./pages";

import Request from "./components/Request";

class App extends Component {
  renderPending = () => {
    return <div>...</div>;
  };

  renderError = err => {
    return <div>{err}</div>;
  };

  renderHome = () => {
    return (
      <Request
        method="get"
        url="/api/talent"
        renderPending={this.renderPending}
        renderError={this.renderError}
      >
        {listings => <Home listings={listings} />}
      </Request>
    );
  };

  render() {
    return (
      <main>
        <Router>
          <Route exact path="/" render={this.renderHome} />
        </Router>
      </main>
    );
  }
}

export default App;
