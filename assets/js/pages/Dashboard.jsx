import React from "react";
import { connect } from "react-redux";
import { navigate } from "~Scripts/actions";

class Dashboard extends React.PureComponent {
  render() {
    return <h1>Dashboard</h1>;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  navigate
})(Dashboard);
