import React from "react";
import { connect } from "react-redux";
import { navigate } from "actions";
import { Loading } from "components";

export function requireSignupStepsCompleted(Component) {
  class SignupStepCompleted extends React.Component {
    componentWillUpdate(nextProps, nextState) {
      let { user } = nextProps;
      if (user !== null && user.registration_step) {
        this.props.navigate(`/registration/${user.registration_step}`);
      }
    }

    render() {
      let { user } = this.props;

      if (user === null) {
        return <Loading />;
      }

      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: state.user.item
  });

  return connect(mapStateToProps, {
    navigate
  })(SignupStepCompleted);
}
