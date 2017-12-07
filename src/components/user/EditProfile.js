import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import { formToObject, usStatesSelectOptions } from "services/helpers";
import { apiGetRequest, editProfile, setFormErrors } from "actions";
import {
  Input2,
  Button2,
  ErrorBlock,
  ProfileCompleted,
  SelectSimple,
  Loading
} from "components";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Update user in Redux state.
    if (this.props.triggerEditProfile !== nextProps.triggerEditProfile) {
      this.props.apiGetRequest("user");
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
    const { errors, inProgress, user } = this.props;

    if (user === null) {
      return <Loading />;
    }

    // if (user.is_profile_completed) {
    //   return <ProfileCompleted user={user} />;
    // }

    return (
      <div className="card">
        <form onSubmit={this.onSubmit} className="form-horizontal">
          <div className="card-header">
            <h2 style={{ textAlign: "center" }}>
              {"Edit user profile"}
              {/*<small>{"some description"}</small>*/}
            </h2>
          </div>

          <div className="card-body card-padding">
            <Input2
              name="first_name"
              placeholder="First Name"
              label="First Name"
              value={user.first_name}
              errors={errors}
            />

            <Input2
              name="last_name"
              placeholder="Last Name"
              label="Last Name"
              value={user.last_name}
              errors={errors}
            />

            <Input2
              name="phone"
              placeholder="Phone"
              label="Phone"
              value={user.phone}
              errors={errors}
            />

            <Input2
              name="address1"
              placeholder="Address line1 (max. length 50)"
              label="Address1"
              value={user.address1}
              errors={errors}
            />

            <Input2
              name="address2"
              placeholder="Address line2 (max. length 50)"
              label="Address2"
              value={user.address2}
              errors={errors}
            />

            <Input2
              name="city"
              placeholder="City"
              label="City"
              value={user.city}
              errors={errors}
            />

            <div className="form-group">
              <label className="control-label col-sm-4">{"State"}</label>
              <div className="col-sm-8">
                <SelectSimple
                  name="state"
                  options={usStatesSelectOptions()}
                  value={user.state}
                />
              </div>
            </div>

            <Input2
              name="postal_code"
              placeholder="Postal Code"
              label="Zip Code"
              value={user.postal_code}
              errors={errors}
            />

            <Input2
              name="date_of_birth"
              placeholder="Date Of Birth"
              type="date"
              label="Date Of Birth"
              value={user.date_of_birth}
              errors={errors}
            />

            {/*

            <Input2
              name="ssn"
              placeholder="SSN"
              label="SSN"
              value={user.ssn}
              errors={errors}
            />

            */}

            <Button2
              text="save"
              className="btn btn-block btn-success waves-effect"
              wrapperClass=""
              disabled={inProgress}
            />
            <ErrorBlock errors={errors} />
          </div>
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  apiGetRequest: PropTypes.func,
  editProfile: PropTypes.func,
  errors: PropTypes.object,
  inProgress: PropTypes.bool,
  setFormErrors: PropTypes.func,
  triggerEditProfile: PropTypes.number,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  errors: state.formErrors.editProfile,
  inProgress: state.user.isSubmittingEditProfile,
  triggerEditProfile: state.user.triggerEditProfile,
  user: state.user.item
});

export default connect(mapStateToProps, {
  apiGetRequest,
  editProfile,
  setFormErrors
})(EditProfile);
