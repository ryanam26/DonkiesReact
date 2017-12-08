import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import autoBind from "react-autobind";
import {
  apiGetRequest,
  navigate,
  login,
  registrationStep3,
  setFormErrors
} from "actions";
import { SETTINGS_LOGIN_URL } from "services/api";
import { Alert, Checkbox, ErrorBlock, Input, Select } from "components";
import { formToObject, getGeoposition } from "services/helpers";
import { API_ROOT_URL } from "store/configureStore";
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
      states: []
    };
  }

  componentWillMount() {
    fetch(`${API_ROOT_URL}v1/auth/signup/3`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`
      }
    })
      .then(r => r.json())
      .then(states => {
        this.setState({ states });
      });
  }

  componentWillReceiveProps(nextProps) {
    let { auth = {} } = nextProps;
    if (auth.step3 === true) {
      this.props.navigate("/registration/4");
    }
  }

  componentWillUnmount() {
    this.props.setFormErrors("clear", null);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.setFormErrors("clear", null);

    let form = formToObject(e.target);

    this.props.registrationStep3(form);
  }

  clickOnLocationButton(e) {
    e.preventDefault();
    getGeoposition()
      .then(geo => {
        let GOOGLE_API_KEY = "AIzaSyAJmIm7I7nR2yWVwa9I-8YyJSm1RCFfFu0",
          lat = geo.coords.latitude,
          lon = geo.coords.longitude;
        return fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`
        )
          .then(r => r.json())
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        alert(error.message);
      });
  }

  render() {
    const { errors, successMessage, settings } = this.props;
    let { states } = this.state;

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
              {/*
                        <button
                            type="button"
                            onClick={this.clickOnLocationButton}
                            className="btn btn-primary m-b-20">
                            Get Address from Google
                        </button>
                        */}

              <Input
                name="address1"
                type="text"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-local-store"
                placeholder="Street Address"
                errors={errors}
              />

              <Input
                name="city"
                type="text"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-city-alt"
                placeholder="City"
                errors={errors}
              />

              <Select
                name="state"
                options={states}
                zmdi="zmdi-balance"
                wrapperClass="m-b-20"
              />

              {/*
                <Input
                name="state"
                type="text"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-balance"
                placeholder="State"
                errors={errors}
              />
              */}

              <Input
                name="postal_code"
                type="text"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-file-text"
                placeholder="Zip Code"
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
  navigate: PropTypes.func,
  registration: PropTypes.func,
  setFormErrors: PropTypes.func,
  settings: PropTypes.object,
  successMessage: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.formErrors.registrationStep3,
  settings: state.settingsLogin,
  successMessage: state.auth.registrationSuccessMessage
});

export default connect(mapStateToProps, {
  apiGetRequest,
  login,
  navigate,
  registrationStep3,
  setFormErrors
})(Registration);
