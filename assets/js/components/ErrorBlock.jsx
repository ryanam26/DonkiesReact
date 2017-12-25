import React, { Component } from "react";

class ErrorBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const errors = this.props.errors;

    if (errors === null || errors === undefined) return null;

    if (errors.hasOwnProperty("non_field_errors")) {
      return (
        <div className="custom-errors">
          <ul>
            {errors.non_field_errors.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        </div>
      );
    }

    return (
      <div className="custom-errors">
        <ul style={{ padding: 0 }}>
          {Object.keys(errors).map((e, index) => {
            return (
              <li key={index}>
                <strong>[{e}]</strong> {errors[e]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ErrorBlock;
