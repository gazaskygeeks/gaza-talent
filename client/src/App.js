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
    const mockProfile = {
      name: "Eoin McCarthy",
      jobTitle: "Full Stack Web Developer",
      bio:
        "Eoin, a member of the Founders and Coders network, joined the GSG team to lead the launch of the Digital Agency. Holding a masters in Applied Mathematics, Eoin worked as a web developer for 3 years, working for a number of startups in London across a diverse range of products, from FinTech to online publishing. Before joining GSG Eoin worked as a project lead on Founders and Coders commercial projects. Eoin has rich experience in tech education, previously serving as a mentor and Course Facilitator at the Founders and Coders campuses in London and Nazareth in addition to Gaza.",
      employmentHistory: [
        {
          title: "Engineering Manager",
          company: "Gaza Sky Geeks",
          dates: "January 2018 - current",
          responsibilities: [
            "Creating Software outsourcing agency in the Gaza Strip",
            "Creating custom software such as Gaza Talent"
          ]
        }
      ]
    };

    return <DeveloperDashboard savedProfile={mockProfile} />;
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
