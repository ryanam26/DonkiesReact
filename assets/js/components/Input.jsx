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

    this.state = {
      value: ""
    };
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });

    if (this.props.onChange !== null) {
      this.props.onChange(e);
    }
  }

  componentWillMount() {
    let { value = "" } = this.props;
    this.setState({ value });
  }

  render() {
    let { label, wrapperClass, errors, zmdi, ...inputProps } = this.props;
    let { value } = this.state;

    delete inputProps["value"];

    return (
      <div className={wrapperClass} style={{ marginBottom: 20 }}>
        {zmdi ? (
          <span
            className="input-group-addon"
            style={{ background: "none", border: "0" }}
          >
            <i className={`zmdi ${zmdi}`} />
          </span>
        ) : null}
        <div
          className={label ? "form-group" : ""}
          style={label ? { marginBottom: 0 } : null}
        >
          {label ? (
            <label className="control-label col-sm-4">{label}</label>
          ) : null}
          <div
            className={`fg-line ${label ? "form-group col-sm-8" : ""}`}
            style={label ? { marginBottom: 0 } : null}
          >
            <input
              defaultValue={value}
              className={`form-control input-sm`}
              onChange={this.onChange}
              {...inputProps}
            />
          </div>
        </div>
        {errors !== null &&
        errors[inputProps.name] &&
        errors[inputProps.name].length ? (
          <div className={`custom-errors ${label ? "col-sm-offset-4" : null}`}>
            {errors[inputProps.name][0]}
          </div>
        ) : null}
      </div>
    );
  }
}
