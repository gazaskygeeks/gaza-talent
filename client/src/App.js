import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home, GithubCallback, DeveloperDashboard } from "./pages";

import FetchData from "./components/FetchData";

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

  renderDeveloperDashboard = () => {
    return (
      <FetchData
        method="get"
        url="/api/profile/current"
        renderPending={this.renderPending}
        renderError={this.renderError}
      >
        {savedProfile => <DeveloperDashboard savedProfile={savedProfile} />}
      </FetchData>
    );
  };

  renderHome = () => {
    return (
      <FetchData
        method="get"
        url="/api/profile"
        renderPending={this.renderPending}
        renderError={this.renderError}
      >
        {listings => <Home listings={listings} />}
      </FetchData>
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
          <Route
            exact
            path="/developer-dashboard"
            render={this.renderDeveloperDashboard}
          />
          <Route exact path="/" render={this.renderHome} />
        </main>
      </Router>
    );
  }
}

export default App;
