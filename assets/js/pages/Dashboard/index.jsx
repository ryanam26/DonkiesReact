import React from "react";
import { connect } from "react-redux";
import { navigate } from "~Scripts/actions";

import Staticstic from "./Statistic";
import Transactions from "./Transactions";

class Dashboard extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Staticstic />
        <Transactions />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  navigate
})(Dashboard);
