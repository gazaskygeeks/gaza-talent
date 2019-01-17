import React from "react";

export default class IconOnHover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    };

    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  onHover() {
    this.setState({
      hovering: true
    });
  }

  onLeave() {
    this.setState({
      hovering: false
    });
  }

  render() {
    return (
      <div
        className="relative"
        onMouseEnter={this.onHover}
        onMouseLeave={this.onLeave}
      >
        {this.props.children}
        <span
          className="absolute top-0 right-0"
          data-path={this.props.name}
          onClick={this.props.onClick}
        >
          {this.state.hovering && this.props.Icon}
        </span>
      </div>
    );
  }
}
