import React from "react";
import AutosizeInput from "react-input-autosize";

export default class EditableInput extends React.Component {
  constructor() {
    super();

    this.state = {
      focused: false
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({
      focused: true
    });
  }

  onBlur() {
    this.setState({
      focused: false
    });
  }

  render() {
    const {
      props: { className, value, multiline },
      state: { focused }
    } = this;

    return (
      <div className="mv0 dib">
        {focused ? (
          <AutosizeInput
            value={value}
            autoComplete="off"
            autoFocus
            ref={i => {
              this.inputRef = i;
            }}
            inputStyle={{
              fontFamily: "inherit"
            }}
            type="text"
            name={this.props.name}
            onChange={this.props.onChange}
            onBlur={this.onBlur}
            placeholder={this.props.placeholder}
            inputClassName={`mw-100 db input-reset outline-0 ba bw1 b--black ph2 pv0 ${className}`}
            onKeyDown={e => {
              console.log({ e, k: e.key });
              if (e.key === "Enter") this.onBlur();
            }}
          />
        ) : (
          <span
            className={`db ba bw1 b--white ph2 pv0 ${className}`}
            onClick={this.onFocus}
            onFocus={this.onFocus}
            tabIndex="0"
          >
            {console.log(value, !!value, this.props.placeholder) || value !== ""
              ? value
              : this.props.placeholder}
          </span>
        )}
      </div>
    );
  }
}
