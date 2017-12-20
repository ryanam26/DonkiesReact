import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import autoBind from "react-autobind";
import {
  apiGetRequest,
  navigate,
  login,
  registrationStep1,
  setFormErrors
} from "actions";
import { SETTINGS_LOGIN_URL } from "services/api";
import { Alert, Checkbox, ErrorBlock, Input, Modal } from "components";
import { formToObject } from "services/helpers";
import { API_ROOT_URL } from "store/configureStore";

import { Text as TermsText } from "components/layout/content/Terms";

/**
 * js/app.js had method that automatically removes "toggled" class
 * from lc-block and div started to be invisible.
 * Removed this method from app.js
 */
class Registration extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      form: null,
      showModal: false,
      agree: false,
      customErrors: {}
    };
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.navigate("/");
    }
    this.props.apiGetRequest(
      "settings_login",
      { useToken: false },
      SETTINGS_LOGIN_URL
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) nextProps.navigate("/");
  }

  componentWillUnmount() {
    this.props.setFormErrors("clear", null);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.setFormErrors("clear", null);

    let form = formToObject(e.target);

    if (!form.email) {
      this.setState({
        customErrors: { email: ["This field may not be blank."] }
      });
    } else {
      fetch(`${API_ROOT_URL}v1/auth/signup?email=${form.email}`)
        .then(response => {
          if (response.status === 200) {
            this.setState({ form, showModal: true, customErrors: {} });
          } else {
            this.setState({ customErrors: { email: ["User already exists"] } });
          }
        })
        .catch(error => {});
    }
  }

  onAccept(e) {
    e.preventDefault();
    let { form } = this.state;
    this.setState({ showModal: false });
    this.props.registrationStep1(form);
  }

  onChange(e) {
    this.setState({
      accept: e.target.checked
    });
  }

  onClickClose(e) {
    this.setState({ showModal: false });
  }

  render() {
    let { showModal = false, accept = false, customErrors } = this.state;
    let { errors, successMessage, settings } = this.props;

    errors = errors ? Object.keys(errors).length : customErrors;

    return (
      <div className="login-content">
        <div ref="block" className="lc-block toggled">
          <h1
            style={{
              color: "white",
              textShadow: "1px 1px 2px #666"
            }}
          >
            Create account
          </h1>
          {showModal ? (
            <Modal
              onClickClose={this.onClickClose}
              showCloseButton={true}
              visible
              title="Terms of Service"
              footer={
                <button
                  type="button"
                  onClick={this.onAccept}
                  disabled={!accept}
                  className="btn btn-success"
                >
                  Continue
                </button>
              }
            >
              <div className="modal-window-terms">
                <div className="modal-window-text">
                  <TermsText />
                </div>
                <div className="modal-window-checkbox">
                  <input
                    name="agree"
                    id="id_agree"
                    type="checkbox"
                    onChange={this.onChange}
                  />
                  <label htmlFor="id_agree">Click here to agree</label>
                </div>
              </div>
            </Modal>
          ) : null}

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
                Already have an account?
                <Link to="/login" className="m-l-5">
                  <span>{"Click Here"}</span>
                </Link>
              </div>

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
  navigate: PropTypes.func,
  registration: PropTypes.func,
  setFormErrors: PropTypes.func,
  settings: PropTypes.object,
  successMessage: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.formErrors.registrationStep1,
  settings: state.settingsLogin,
  successMessage: state.auth.registrationSuccessMessage
});

export default connect(mapStateToProps, {
  apiGetRequest,
  login,
  navigate,
  registrationStep1,
  setFormErrors
})(Registration);
