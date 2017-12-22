import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";

import formToObject from "~Scripts/utils/formToObject";
import { setFormErrors } from "~Scripts/actions";
import { changePassword } from "~Scripts/actions/user";
import Input from "~Scripts/components/Input";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.inProgress && !nextProps.inProgress) {
      this.refs.form.reset();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.setFormErrors("clear", null);

    const form = formToObject(e.target);
    this.props.changePassword(form);
  }

  render() {
    const { errors = {}, inProgress, user } = this.props;

    return (
      <div className="card">
        <form ref="form" onSubmit={this.onSubmit} className="form-horizontal">
          <div className="card-header">
            <h2 style={{ textAlign: "center" }}>{"Change password"}</h2>
          </div>

          <div className="card-body card-padding">
            <Input
              name="current_password"
              placeholder="Current password"
              label="Current password"
              type="password"
              errors={errors}
            />

            <Input
              name="new_password1"
              placeholder="New password"
              label="New password"
              type="password"
              errors={errors}
            />

            <Input
              name="new_password2"
              placeholder="Confirm new password"
              label="Confirm"
              type="password"
              errors={errors}
            />

            <div className="col-sm-offset-4">
              <button
                className="btn btn-primary waves-effect"
                type="submit"
                disabled={inProgress && !Object.keys(errors).length}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.formErrors.changePassword,
  triggerChangePassword: state.user.triggerChangePassword,
  inProgress: state.user.inProgress,
  user: state.user.details
});

export default connect(mapStateToProps, {
  changePassword,
  setFormErrors
})(ChangePassword);
