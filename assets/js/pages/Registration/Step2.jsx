import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import autoBind from "react-autobind";

import ErrorBlock from "~Scripts/components/ErrorBlock";
import Input from "~Scripts/components/Input";
import Modal from "~Scripts/components/Modal";

import { navigate, setFormErrors } from "~Scripts/actions";
import { registrationStep2 } from "~Scripts/actions/user";

import formToObject from "~Scripts/utils/formToObject";
import { API_ROOT_URL } from "~Scripts/store/configureStore";
import { TermsText } from "~Scripts/pages/Terms";

class Registration extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { user_details = {} } = nextProps;

    if (Object.keys(user_details).length && !user_details.registration_step) {
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
    const { errors } = this.props;

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

const mapStateToProps = state => ({
  user_details: state.user.details,
  errors: state.formErrors.registrationStep2
});

export default connect(mapStateToProps, {
  navigate,
  registrationStep2,
  setFormErrors
})(Registration);
