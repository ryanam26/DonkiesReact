import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import autoBind from "react-autobind";
import {
  apiGetRequest,
  navigate,
  login,
  registrationStep2,
  setFormErrors
} from "actions";
import { SETTINGS_LOGIN_URL } from "services/api";
import { Alert, Checkbox, ErrorBlock, Input } from "components";
import { formToObject } from "services/helpers";
/**
 * js/app.js had method that automatically removes "toggled" class
 * from lc-block and div started to be invisible.
 * Removed this method from app.js
 */
class Registration extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { user, auth = {} } = nextProps;
    if (auth.step2 === true || (user !== null && !user.registration_step)) {
      this.props.navigate("/");
    }
  }

  componentWillUnmount() {
    this.props.setFormErrors("clear", null);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.setFormErrors("clear", null);

    let form = formToObject(e.target);

    this.props.registrationStep2(form);
  }

  render() {
    const { errors, successMessage, settings } = this.props;

    return (
      <div className="login-content">
        <div ref="block" className="lc-block toggled">
          <h1
            style={{
              color: "white",
              textShadow: "1px 1px 2px #666"
            }}
          >
            Create a CoinStash Account
          </h1>

          <div className="lcb-form">
            <form ref="form" onSubmit={this.onSubmit} target="">
              <Input
                name="first_name"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-account"
                placeholder="First name"
                errors={errors}
              />

              <Input
                name="last_name"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-account"
                placeholder="Last name"
                errors={errors}
              />

              <Input
                name="phone"
                type="text"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-phone"
                placeholder="Phone number"
                errors={errors}
              />

              <button type="submit" className="btn btn-success">
                Continue
              </button>

              {errors && <ErrorBlock errors={errors} />}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Registration.propTypes = {
  apiGetRequest: PropTypes.func,
  errors: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  user: PropTypes.object,
  navigate: PropTypes.func,
  registration: PropTypes.func,
  setFormErrors: PropTypes.func,
  settings: PropTypes.object,
  successMessage: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user.item,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.formErrors.registrationStep2,
  settings: state.settingsLogin,
  successMessage: state.auth.registrationSuccessMessage
});

export default connect(mapStateToProps, {
  apiGetRequest,
  login,
  navigate,
  registrationStep2,
  setFormErrors
})(Registration);
