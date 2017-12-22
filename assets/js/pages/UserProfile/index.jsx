import React, { Component } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";

import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";

class UserProfilePage extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.inProgress && !nextProps.inProgress) {
      swal("User updated", "User successfully updated!", "success");
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <EditProfile />
        </div>

        <div className="col-md-6 col-sm-12">
          <ChangePassword />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inProgress: state.user.inProgress
});

export default connect(mapStateToProps, {})(UserProfilePage);
