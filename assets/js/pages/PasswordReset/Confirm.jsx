import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import autoBind from "react-autobind";
import { navigate } from "~Scripts/actions";
import { apiCall } from "~Scripts/utils/api";
import { RESET_PASSWORD_URL } from "~Scripts/constants/urls";
import formToObject from "~Scripts/utils/formToObject";

import Alert from "~Scripts/components/Alert";
import Input from "~Scripts/components/Input";
import ErrorBlock from "~Scripts/components/ErrorBlock";

import swal from "sweetalert";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      id: null,
      errorMessage: null,
      redirectMessage: null,
      token: null
    };
  }

  componentWillMount() {
    let query = {};
    this.props.location.search
      .slice(1)
      .split("&")
      .forEach(item => {
        let parsed = item.split("=");
        query[parsed[0]] = parsed[1];
      });

    if (!query.hasOwnProperty("id") || !query.hasOwnProperty("token")) {
      this.props.navigate("/login");
      return;
    }
    this.setState({ id: query.id, token: query.token });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errorMessage: null });

    let form = formToObject(e.target);
    form.encrypted_id = this.state.id;
    form.reset_token = this.state.token;

    if (form.new_password.trim().length < 8) {
      swal("Error", "The minimum password length is 8 symbols", "error");
      return;
    }

    if (form.new_password !== form.new_password_confirm) {
      swal("Error", "Passwords do not match", "error");
      return;
    }
    this.sendForm(form);
  }

  async sendForm(form) {
    let response = await apiCall(RESET_PASSWORD_URL, "POST", form);
    if (response.status === 400) {
      const result = await response.json();
      let arr = Object.keys(result);
      let key = arr[0];
      this.setState({ errorMessage: result[key][0] });
    } else if (response.status === 204) {
      this.refs.form.reset();
      this.redirectLogin();
    }
  }

  redirectLogin() {
    swal(
      "Success",
      "You have set new password. You will be redirected to login page",
      "success"
    ).then(() => {
      this.props.navigate("/login");
    });
  }

  render() {
    const { errorMessage, redirectMessage } = this.state;

    return (
      <div className="login-content">
        <div className="lc-block toggled">
          <div className="lcb-form">
            <p className="text-left">{"Set new password."}</p>

            <form ref="form" onSubmit={this.onSubmit}>
              <Input
                type="password"
                name="new_password"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-male"
                placeholder="New password"
              />

              <Input
                type="password"
                name="new_password_confirm"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-male"
                placeholder="New password confirm"
              />

              <button
                type="submit"
                href="#"
                className="btn btn-login btn-success btn-float"
              >
                <i className="zmdi zmdi-check" />
              </button>
            </form>
          </div>

          {errorMessage && (
            <Alert type="danger" value={errorMessage} showClose={false} />
          )}

          {redirectMessage && <Alert type="success" value={redirectMessage} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  navigate
})(ResetPassword);
