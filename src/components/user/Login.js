import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import autoBind from "react-autobind";
import { HOME_PAGE_URL } from "store/configureStore";
import { formToObject } from "services/helpers";
import { SETTINGS_LOGIN_URL } from "services/api";
import { apiGetRequest, login, navigate, setFormErrors } from "actions";
import { Checkbox, ErrorBlock, Input } from "components";
import FacebookButton from "./private/FacebookButton";

class Login extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.navigate("/");
      return;
    }
    this.props.apiGetRequest(
      "settings_login",
      { useToken: false },
      SETTINGS_LOGIN_URL
    );
  }

  componentWillReceiveProps(props) {
    if (props.auth.isAuthenticated) {
      props.navigate("/");
    }
  }

  componentWillUnmount() {
    this.props.setFormErrors("clear", null);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.setFormErrors("clear", null);

    let form = formToObject(e.target);

    if (form.email.length === 0) {
      this.props.setFormErrors("login", { email: ["Please input email"] });
      return;
    }

    if (form.password.length === 0) {
      this.props.setFormErrors("login", {
        password: ["Please input password"]
      });
      return;
    }

    this.props.login(form.email, form.password);
  }

  render() {
    const { errors, settings } = this.props;
    console.log(errors);

    return (
      <div className="login-content">
        <div className="lc-block toggled">
          <h1
            style={{
              color: "white",
              textShadow: "1px 1px 2px #666"
            }}
          >
            Log In
          </h1>

          <div className="lcb-form">
            <form ref="form" onSubmit={this.onSubmit} target="">
              <Input
                name="email"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-email"
                placeholder="Email Address"
                errors={errors}
              />

              <Input
                name="password"
                type="password"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-male"
                placeholder="Password"
                errors={errors}
              />

              <div className="m-b-10">
                Forgot password?
                <Link to="/forgot_password" className="m-l-5">
                  <span>{"Click here"}</span>
                </Link>
              </div>

              <button type="submit" className="btn btn-success">
                Continue
              </button>

              {errors && <ErrorBlock errors={errors} />}
            </form>
          </div>

          <div className="lcb-navigation">
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

Login.propTypes = {
  apiGetRequest: PropTypes.func,
  auth: PropTypes.object,
  errors: PropTypes.object,
  location: PropTypes.object,
  login: PropTypes.func,
  navigate: PropTypes.func,
  setFormErrors: PropTypes.func,
  settings: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.formErrors.login,
  settings: state.settingsLogin
});

export default connect(mapStateToProps, {
  apiGetRequest,
  login,
  navigate,
  setFormErrors
})(Login);
