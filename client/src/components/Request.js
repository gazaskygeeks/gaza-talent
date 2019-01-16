import { Component } from "react";
import axios from "axios";

const PENDING = "PENDING";
const ERROR = "ERROR";
const DONE = "DONE";

export default class FetchData extends Component {
  constructor(props) {
    super(props);

    this.request = this.request.bind(this);
  }

  state = {
    requestStatus: PENDING
  };

  request(payload) {
    axios[this.props.method](this.props.url, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("jwt")}`
      },
      body: payload
    }).then(
      response => {
        this.setState({
          payload: response.data,
          requestStatus: DONE
        });
      },
      error => {
        this.setState({
          error,
          requestStatus: ERROR
        });
      }
    );
  }

  render() {
    const {
      state: { requestStatus, payload, error },
      props: { renderPending, renderError, children }
    } = this;

    return children({
      request: this.request,
      payload,
      status: requestStatus,
      error
    });
  }
}
