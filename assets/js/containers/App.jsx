import React from "react";
import { Route, Redirect } from "react-router-dom";

import HomePage from "~Scripts/pages/Dashboard";
import AccountsPage from "~Scripts/pages/Accounts";
import FAQPage from "~Scripts/pages/FAQ";
import AddBankPage from "~Scripts/pages/Bank/Add";
import AddLenderPage from "~Scripts/pages/Lender/Add";
import ConfigureAccountsPage from "~Scripts/pages/Accounts/Configure";
import CreateFundingSourcePage from "~Scripts/pages/FundingSource/Add";
import LoanCalculatorPage from "~Scripts/pages/Calculator";
import SettingsPage from "~Scripts/pages/Settings";
import TransactionsPage from "~Scripts/pages/Transactions";
import UserProfilePage from "~Scripts/pages/UserProfile";

import Loader from "~Scripts/components/Loader";

import { connect } from "react-redux";
import { navigate, apiGetRequest } from "~Scripts/actions";
import { setToken } from "~Scripts/actions/user";

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let token = window.localStorage.getItem("token");
    if (!token) {
      this.props.navigate("/login");
      return;
    }
    this.props.setToken(token);
    this.props.apiGetRequest("user");
  }

  componentWillReceiveProps(nextProps) {
    let { user_details = {} } = nextProps;

    if (Object.keys(user_details).length && user_details.registration_step) {
      this.props.navigate(`/registration/${user_details.registration_step}`);
    }
  }

  render() {
    let { user_details = {} } = this.props;

    if (!Object.keys(user_details).length) {
      return <Loader />;
    }

    return (
      <React.Fragment>
        <Route component={HomePage} path="/" exact />
        <Route component={AccountsPage} path="/accounts" />
        <Route component={FAQPage} path="/faq" />
        <Route component={AddBankPage} path="/add_bank" />
        <Route component={AddLenderPage} path="/add_lender" />
        <Route component={ConfigureAccountsPage} path="/configure_accounts" />
        <Route
          component={CreateFundingSourcePage}
          path="/create_funding_souce"
        />
        <Route component={LoanCalculatorPage} path="/loan_calculator" />
        <Route component={SettingsPage} path="/settings" />
        <Route component={TransactionsPage} path="/transactions" />
        <Route component={UserProfilePage} path="/user_profile" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user_details: state.user.details
});

export default connect(mapStateToProps, {
  navigate,
  setToken,
  apiGetRequest
})(App);
