import React, { Component } from "react";

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { inline } = this.props;

    if (inline !== null) {
      return (
        <div className="preloader pls-blue">
          <svg className="pl-circular" viewBox="25 25 50 50">
            <circle className="plc-path" cx="50" cy="50" r="20" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="page-loader">
          <div className="preloader pls-blue">
            <svg className="pl-circular" viewBox="25 25 50 50">
              <circle className="plc-path" cx="50" cy="50" r="20" />
            </svg>

            <p>{"Please wait..."}</p>
          </div>
        </div>
      );
    }
  }
}
