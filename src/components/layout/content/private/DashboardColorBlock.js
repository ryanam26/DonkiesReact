import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import classNames from "classnames";

export default class DashboardColorBlock extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { value, className, content, title, footer } = this.props;

    const cn = classNames("dashboard-color-block");

    return (
      <div className="col-sm-6 col-md-4">
        <div className={cn} title={content} data-ma-theme="blue">
          <div className="title-text">{title}</div>
          <div className="amount">{value}</div>
          {footer}
        </div>
      </div>
    );
  }
}

DashboardColorBlock.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.any
};
