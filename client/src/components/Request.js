import { Component } from 'react'
import axios from 'axios'

const PENDING = 'PENDING'
const ERROR = 'ERROR'
const DONE = 'DONE'

export default class Request extends Component {
    state = {
      requestStatus: PENDING
    }

  componentDidMount() {
    axios[this.props.method](this.props.url)
      .then(response => {
        this.setState({
          payload: response.data,
          requestStatus: DONE
        })
      }, error => {
        this.setState({
          error,
          requestStatus: ERROR
        })
      })
  }

  render() {
    const {
      state: {
        requestStatus,
        payload,
        error
      },
      props: {
        renderPending,
        renderError,
        children
      }
    } = this

    if (requestStatus === PENDING) return renderPending()

    if (requestStatus === ERROR) return renderError(error)

    return children(payload)
  }
}
