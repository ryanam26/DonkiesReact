import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import { accountsSetPrimary } from "actions";
import { formToObject } from "services/helpers";
import { Button2, SelectSimple } from "components";

/**
 * Used in Modal when user required to set
 * primary account.
 */
class SetPrimaryAccount extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onSelect(value) {}

  onSubmit(e) {
    e.preventDefault();
    const form = formToObject(e.target);
    if (form.primary_account.trim().length === 0) {
      return;
    }
    this.props.accountsSetPrimary(form.primary_account);
  }

  /**
     * Select options.
     */
  getOptions() {
    const { accounts } = this.props;

    let data = [];
    for (let account of accounts) {
      let text = `${account.name} ($${account.balance})`;
      data.push({ value: account.id, text: text });
    }
    return data;
  }

  render() {
    const { inProgress } = this.props;

    return (
      <div className="login-content">
        <div ref="block" className="lc-block toggled">
          <h1
            style={{
              color: "white",
              textShadow: "1px 1px 2px #666"
            }}
          >
            Set Primary Bank Account
          </h1>

          <div className="lcb-form" style={{ padding: 35 }}>
            <form ref="form" onSubmit={this.onSubmit}>
              <SelectSimple
                name="primary_account"
                onChange={this.onSelect}
                options={this.getOptions()}
              />

              <br />
              <br />
              <Button2
                wrapperClass=""
                disabled={inProgress}
                type="submit"
                text="Save"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SetPrimaryAccount.propTypes = {
  accounts: PropTypes.array,
  accountsSetPrimary: PropTypes.func,
  inProgress: PropTypes.bool
};

const mapStateToProps = state => ({
  inProgress: state.accounts.setPrimaryAccountInProgress
});

export default connect(mapStateToProps, {
  accountsSetPrimary
})(SetPrimaryAccount);
