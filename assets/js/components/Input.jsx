import React from "react";
import autoBind from "react-autobind";
import classNames from "classnames";

export default class Input extends React.Component {
  static get defaultProps() {
    return {
      type: "text",
      disabled: false,
      errors: null,
      label: null,
      onBlur: null,
      onChange: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      placeholder: null,
      zmdi: null,
      wrapperClass: ""
    };
  }

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    let { label, wrapperClass, zmdi, ...inputProps } = this.props;
    return (
      <div className={wrapperClass}>
        {zmdi ? (
          <span
            className="input-group-addon"
            style={{ background: "none", border: "0" }}
          >
            <i className={`zmdi ${zmdi}`} />
          </span>
        ) : null}
        <div>
          {label ? <label>{label}</label> : null}
          <div className="fg-line">
            <input className="form-control input-sm" {...inputProps} />
          </div>
        </div>
      </div>
    );
  }
}
