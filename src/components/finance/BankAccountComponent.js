import React, { PropTypes } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import { Loading } from "components";
import { Link } from "react-router";

class BankAccount extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    let { accounts } = this.props;

    if (accounts === null || !accounts.length) {
      return <Loading />;
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
                className="btn btn-primary btn-block"
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

BankAccount.propTypes = {
  accounts: PropTypes.array,
  accountsNotActive: PropTypes.array,
  // accountsSetPrimary: PropTypes.func,
  // apiGetRequest: PropTypes.func,
  // navigate: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  accounts: state.accounts.debitAccounts,
  accountsNotActive: state.accounts.debitAccountsNotActive,
  user: state.user.item
});

export default connect(mapStateToProps, {
  // accountsSetPrimary,
  // apiGetRequest,
  // navigate
})(BankAccount);
