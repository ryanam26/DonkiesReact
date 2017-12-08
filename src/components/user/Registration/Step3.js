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
import { Alert, Checkbox, ErrorBlock, Input, Select, Modal } from "components";
import { formToObject, getGeoposition } from "services/helpers";
import { API_ROOT_URL } from "store/configureStore";
import Script from "react-load-script";

const GOOGLE_API_KEY = "AIzaSyAJmIm7I7nR2yWVwa9I-8YyJSm1RCFfFu0";

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
      states: [],
      showModal: false
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

  // clickOnLocationButton(e) {
  //   e.preventDefault();
  //   getGeoposition()
  //     .then(geo => {
  //       let GOOGLE_API_KEY = "AIzaSyAJmIm7I7nR2yWVwa9I-8YyJSm1RCFfFu0",
  //         lat = geo.coords.latitude,
  //         lon = geo.coords.longitude;
  //       return fetch(
  //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`
  //       )
  //         .then(r => r.json())
  //         .then(response => {
  //           console.log(response);
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     })
  //     .catch(error => {
  //       alert(error.message);
  //     });
  // }

  showModalWindow(e) {
    if (e) e.preventDefault();
    this.setState({ showModal: true });
  }

  hideModalWindow(e) {
    if (e) e.preventDefault();
    this.setState({ showModal: false });
  }

  onScriptError() {}

  onScriptLoad() {
    let map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.3002752813443, lng: -119.8828125 },
      zoom: 5
    });

    map.addListener("click", e => {
      this.hideModalWindow();
      let lat = e.latLng.lat(),
        lng = e.latLng.lng();

      return fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      )
        .then(r => r.json())
        .then(response => {
          console.log(response);
          let results = response.results;

          // Street address

          let street = results.filter(
            item => item.types[0] == "street_address"
          )[0];
          let street_number = street.address_components.filter(
            item => item.types[0] === "street_number"
          )[0].long_name;
          let route = street.address_components.filter(
            item => item.types[0] === "route"
          )[0].long_name;
          document.getElementsByName(
            "address1"
          )[0].value = `${route}, ${street_number}`;

          // Zip code

          let zipcode = results
            .filter(item => item.types[0] === "postal_code")[0]
            .address_components.filter(
              item => item.types[0] === "postal_code"
            )[0].long_name;
          document.getElementsByName("postal_code")[0].value = zipcode;

          // City

          let city = results
            .filter(
              item =>
                item.types[0] === "locality" && item.types[1] === "political"
            )[0]
            .address_components.filter(
              item =>
                item.types[0] === "locality" && item.types[1] === "political"
            )[0].long_name;
          document.getElementsByName("city")[0].value = city;

          // State

          let state = results
            .filter(
              item =>
                item.types[0] === "administrative_area_level_1" &&
                item.types[1] === "political"
            )[0]
            .address_components.filter(
              item =>
                item.types[0] === "administrative_area_level_1" &&
                item.types[1] === "political"
            )[0].short_name;
          document.getElementsByName("state")[0].value = state;
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  render() {
    const { errors, successMessage, settings } = this.props;
    let { states, showModal } = this.state;

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

          {showModal ? (
            <Modal
              onClickClose={this.hideModalWindow}
              showCloseButton={true}
              visible
              title="Select your location"
            >
              <div>
                <Script
                  url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`}
                  onError={this.onScriptError}
                  onLoad={this.onScriptLoad}
                />
                <div style={{ height: 250 }} id="map" />
              </div>
            </Modal>
          ) : null}

          <div className="lcb-form">
            <form ref="form" onSubmit={this.onSubmit} target="">
              <button
                type="button"
                onClick={this.showModalWindow}
                className="btn btn-primary m-b-20"
              >
                Get Address from Google
              </button>

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
