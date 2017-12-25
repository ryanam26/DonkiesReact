import React from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import { Link } from "react-router-dom";

import Loader from "~Scripts/components/Loader";

class BankAccount extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    let { accounts } = this.props;

    if (accounts === null || !accounts.length) {
      return <Loader />;
    }

    let current_account =
      accounts.filter(item => item.is_primary)[0] || accounts[0];

    return (
      <div className="bank-account-block">
        <div className="card bank-account-block-details">
          <div className="bank-account-block-details-header">
            {current_account.institution.name}
          </div>
          <hr />
          <div className="bank-account-block-details-content">
            <div className="bank-account-block-details-content-text">
              {`${current_account.name} ${current_account.mask}`}
            </div>
            <div className="bank-account-block-details-content-button m-t-20">
              <Link
                to="/configure_accounts"
                className="btn btn-lg btn-primary btn-block"
              >
                Remove bank
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.debitAccounts,
  accountsNotActive: state.accounts.debitAccountsNotActive,
  user: state.user.item
});

export default connect(mapStateToProps, {})(BankAccount);
