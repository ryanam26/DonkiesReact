import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import autoBind from "react-autobind";

import ErrorBlock from "~Scripts/components/ErrorBlock";
import Input from "~Scripts/components/Input";
import Modal from "~Scripts/components/Modal";

import { navigate, setFormErrors } from "~Scripts/actions";
import { registrationStep1 } from "~Scripts/actions/user";

import formToObject from "~Scripts/utils/formToObject";
import { API_ROOT_URL } from "~Scripts/store/configureStore";
import { TermsText } from "~Scripts/pages/Terms";

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
    let { errors, successMessage } = this.props;

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

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  errors: state.formErrors.registrationStep1
});

export default connect(mapStateToProps, {
  navigate,
  registrationStep1,
  setFormErrors
})(Registration);
