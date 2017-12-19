import React from "react";
import { connect } from "react-redux";
import { navigate, apiGetRequest } from "actions";
import { Loading } from "components";

export function checkLenders(Component) {
  class CheckLenders extends React.Component {
    componentWillUpdate(nextProps, nextState) {
      let { user_lenders } = nextProps;
      if (user_lenders !== null && !user_lenders.length) {
        this.props.navigate(`/add_lender`);
      }
    }

    componentWillMount() {
      this.props.apiGetRequest("user_lenders");
    }

    render() {
      let { user_lenders = [] } = this.props;

      if (user_lenders === null || !user_lenders.length) {
        return <Loading />;
      }

      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user_lenders: state.lenders.user_lenders
  });

  return connect(mapStateToProps, { navigate, apiGetRequest })(CheckLenders);
}
