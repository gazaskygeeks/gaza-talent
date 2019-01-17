import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { set as setSession } from "../session";

class GithubCallback extends React.Component {
  componentDidMount() {
    // polyfill required?
    const params = new URL(window.location).searchParams;
    const code = params.get("code");

    axios.get(`/api/github/callback?code=${code}`).then(jwt => {
      setSession(jwt.data.token);

      this.props.history.push("/developer-dashboard");
    });
  }

  render() {
    return <span> github callback </span>;
  }
}

export default withRouter(GithubCallback);
