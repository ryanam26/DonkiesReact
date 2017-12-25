import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import autoBind from "react-autobind";

import { setFormErrors, navigate } from "~Scripts/actions";
import { resetPasswordRequest } from "~Scripts/actions/user";
import formToObject from "~Scripts/utils/formToObject";

import Alert from "~Scripts/components/Alert";
import Input from "~Scripts/components/Input";
import ErrorBlock from "~Scripts/components/ErrorBlock";

import swal from "sweetalert";

class ResetPasswordRequest extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      message: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.trigger && !nextProps.trigger) {
      this.refs.form.reset();

      swal(
        "Success",
        "Please check your email for further instruction.",
        "success"
      ).then(() => {
        this.props.navigate("/");
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.setFormErrors("clear", null);
    this.setState({ message: null });

    let form = formToObject(e.target);
    this.props.resetPasswordRequest(form);
  }

  render() {
    const { errors } = this.props;
    const { message } = this.state;

    return (
      <div className="login-content">
        <div className="lc-block toggled">
          <div className="lcb-form">
            <p className="text-left">{"Please input your email."}</p>

            <form ref="form" onSubmit={this.onSubmit}>
              <Input
                name="email"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-email"
                placeholder="Email Address"
              />

              <button
                type="submit"
                href="#"
                className="btn btn-login btn-success btn-float"
              >
                <i className="zmdi zmdi-check" />
              </button>

              {errors && <ErrorBlock errors={errors} />}
            </form>

            {message && <Alert type="success" value={message} />}
          </div>

          <div className="lcb-navigation">
            <Link to="/login" data-ma-block="#l-login">
              <i className="zmdi zmdi-long-arrow-right" />
              <span>{"Sign in"}</span>
            </Link>

            <Link to="/registration" data-ma-block="#l-register">
              <i className="zmdi zmdi-plus" />
              <span>{"Register"}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.formErrors.resetPasswordRequest,
  trigger: state.user.inProgress
});

export default connect(mapStateToProps, {
  resetPasswordRequest,
  setFormErrors,
  navigate
})(ResetPasswordRequest);
