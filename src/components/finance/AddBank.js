import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import Script from "react-load-script";

import { apiGetRequest, navigate } from "actions";
import { Alert, Button2, Loading, PlaidLink } from "components";

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
    if (this.props.triggerItemCreated !== nextProps.triggerItemCreated) {
      this.setState({ showSuccess: true });
      setTimeout(() => {
        this.props.navigate("/add_lender");
      }, 5000);
    }
  }

  onScriptError() {
    this.setState({ isScriptError: true });
  }

  onScriptLoad() {
    this.setState({ isScriptLoaded: true });
  }

  render() {
    const { settings } = this.props;
    const { isScriptError, isScriptLoaded, showSuccess } = this.state;

    if (!settings) {
      return <Loading />;
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
              {!showSuccess && (
                <PlaidLink>
                  <button className="btn btn-default">Add bank account</button>
                </PlaidLink>
              )}

              {showSuccess && (
                <Alert type="success" value={"Bank account created!"} />
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

AddBank.propTypes = {
  navigate: PropTypes.func,
  settings: PropTypes.object,
  triggerItemCreated: PropTypes.number
};

const mapStateToProps = state => ({
  triggerItemCreated: state.items.triggerItemCreated,
  settings: state.settings
});

export default connect(mapStateToProps, {
  apiGetRequest,
  navigate
})(AddBank);
