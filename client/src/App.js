import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home, GithubCallback } from "./pages";

import Request from "./components/Request";

class App extends Component {
  renderPending = () => {
    return <div>...</div>;
  };

  renderError = err => {
    return <div>{err.toString()}</div>;
  };

  renderGithubCallback = () => {
    return <GithubCallback />;
  };

  renderHome = () => {
    return (
      <Request
        method="get"
        url="/api/profile"
        renderPending={this.renderPending}
        renderError={this.renderError}
      >
        {listings => <Home listings={listings} />}
      </Request>
    );
  };

  render() {
    return (
      <Router>
        <main>
          <Route
            exact
            path="/github/callback"
            render={this.renderGithubCallback}
          />
          <Route exact path="/" render={this.renderHome} />
        </main>
      </Router>
    );
  }
}

export default App;
