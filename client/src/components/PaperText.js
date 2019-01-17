import React from "react";
import AutosizeInput from "react-input-autosize";
import { CLASS_NAME_INPUT_SPACING } from "../constants/typeographyClassNames";
export default class PaperText extends React.Component {
  constructor() {
    super();

    this.state = {
      focused: false
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus(e) {
    if (this.props.enabled) {
      this.setState({
        focused: true
      });
      e.preventDefault();
      e.stopProgagation();
    }
  }

  onBlur(e) {
    if (this.props.enabled) {
      this.setState({
        focused: false
      });
      e.preventDefault();
      e.stopProgagation();
    }
  }

  render() {
    const {
      props: { className, value },
      state: { focused }
    } = this;

    return (
      <div className="mv0 dib">
        {focused ? (
          <React.Fragment>
            <AutosizeInput
              value={value}
              autoComplete="off"
              autoFocus
              inputStyle={{
                fontFamily: "inherit"
              }}
              type="text"
              name={this.props.name}
              onChange={this.props.onChange}
              onBlur={this.onBlur}
              inputClassName={`mw-100 db input-reset outline-0 ba bw1 b--black ph2 pv0 ${className}`}
              onKeyDown={e => {
                if (e.key === "Enter") this.onBlur();
              }}
            />
          </React.Fragment>
        ) : (
          <span
            className={`${CLASS_NAME_INPUT_SPACING} ${className}`}
            onClick={this.onFocus}
            onFocus={this.onFocus}
            tabIndex="0"
          >
            {value}
          </span>
        )}
      </div>
    );
  }
}
