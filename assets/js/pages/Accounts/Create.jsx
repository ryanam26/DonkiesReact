import React, { Component } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import Script from "react-load-script";

import { apiGetRequest, navigate } from "~Scripts/actions";

import Alert from "~Scripts/components/Alert";
import Loader from "~Scripts/components/Loader";
import PlaidLink from "~Scripts/components/PlaidLink";

class AddBank extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      showSuccess: false,
      isScriptLoaded: false,
      isScriptError: false
    };
  }

  componentWillMount() {
    this.props.apiGetRequest("settings");
  }

  componentWillReceiveProps(nextProps) {
    let { accounts } = nextProps;
    if (accounts !== null && accounts.length) {
      this.props.navigate("/");
    }
  }

  onScriptError() {
    this.setState({ isScriptError: true });
  }

  onScriptLoad() {
    this.setState({ isScriptLoaded: true });
  }

  render() {
    const { settings, error } = this.props;
    const { isScriptError, isScriptLoaded, showSuccess } = this.state;

    if (!settings) {
      return <Loader />;
    }

    if (isScriptError) {
      const message = `
                We are sorry! We can not now process your request.
                Please try again later.
            `;
      return <Alert type="danger" showClose={false} value={message} />;
    }

    return (
      <div className="login-content">
        <div ref="block" className="lc-block toggled">
          <h1
            style={{
              color: "white",
              textShadow: "1px 1px 2px #666"
            }}
          >
            Please add Primary Bank Account
          </h1>

          <Script
            url="https://cdn.plaid.com/link/v2/stable/link-initialize.js"
            onError={this.onScriptError}
            onLoad={this.onScriptLoad}
          />

          {isScriptLoaded ? (
            <div className="lcb-form" style={{ padding: 35 }}>
              {!showSuccess ? (
                <PlaidLink>
                  <button className="btn btn-default">Add bank account</button>
                  <div className="custom-errors">{error && error}</div>
                </PlaidLink>
              ) : (
                <Alert type="success" value={"Bank account created!"} />
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
  accounts: state.accounts.accounts,
  error: state.formErrors.item
});

export default connect(mapStateToProps, {
  apiGetRequest,
  navigate
})(AddBank);
