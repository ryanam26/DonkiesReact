import React, { Component } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";

import formToObject from "~Scripts/utils/formToObject";
import usStatesSelectOptions from "~Scripts/utils/usStates";

import { setFormErrors } from "~Scripts/actions";
import { editProfile } from "~Scripts/actions/user";

import Input from "~Scripts/components/Input";
import Select from "~Scripts/components/Select";
import Loader from "~Scripts/components/Loader";
import ErrorBlock from "~Scripts/components/ErrorBlock";

class EditProfile extends Component {
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
    if (form.state === "") {
      this.props.setFormErrors("editProfile", {
        non_field_errors: ["Please select State"]
      });
      return;
    }
    this.props.editProfile(form);
  }

  render() {
    const { errors = {}, inProgress, user } = this.props;

    if (user === null) {
      return <Loader />;
    }

    return (
      <div className="card">
        <form ref="form" onSubmit={this.onSubmit} className="form-horizontal">
          <div className="card-header">
            <h2 style={{ textAlign: "center" }}>
              {"Edit user profile"}
              {/*<small>{"some description"}</small>*/}
            </h2>
          </div>

          <div className="card-body card-padding">
            <Input
              name="first_name"
              placeholder="First Name"
              label="First Name"
              value={user.first_name}
              errors={errors}
            />

            <Input
              name="last_name"
              placeholder="Last Name"
              label="Last Name"
              value={user.last_name}
              errors={errors}
            />

            <Input
              name="phone"
              placeholder="Phone"
              label="Phone"
              value={user.phone}
              errors={errors}
            />

            <Input
              name="address1"
              placeholder="Address line1 (max. length 50)"
              label="Address1"
              value={user.address1}
              errors={errors}
            />

            <Input
              name="address2"
              placeholder="Address line2 (max. length 50)"
              label="Address2"
              value={user.address2}
              errors={errors}
            />

            <Input
              name="city"
              placeholder="City"
              label="City"
              value={user.city}
              errors={errors}
            />

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="control-label col-sm-4">{"State"}</label>
              <Select
                name="state"
                wrapperClass="col-sm-8 form-group"
                options={usStatesSelectOptions()}
                value={user.state}
              />
            </div>

            <Input
              name="postal_code"
              placeholder="Postal Code"
              label="Zip Code"
              value={user.postal_code}
              errors={errors}
            />

            <Input
              name="date_of_birth"
              placeholder="Date Of Birth"
              type="date"
              label="Date Of Birth"
              value={user.date_of_birth}
              errors={errors}
            />

            {/*

            <Input
              name="ssn"
              placeholder="SSN"
              label="SSN"
              value={user.ssn}
              errors={errors}
            />

            */}

            <button
              className="btn btn-block btn-success waves-effect"
              disabled={inProgress}
            >
              Save
            </button>
            <ErrorBlock errors={errors} />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.formErrors.editProfile,
  inProgress: state.user.inProgress,
  user: state.user.details
});

export default connect(mapStateToProps, {
  editProfile,
  setFormErrors
})(EditProfile);
