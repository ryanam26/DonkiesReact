import React, { Component } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";

import { setFormErrors } from "~Scripts/actions";
import { createItem } from "~Scripts/actions/bank";
import Loader from "~Scripts/components/Loader";

let handler = null;

class PlaidLink extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const { settings } = this.props;

    handler = Plaid.create({
      clientName: settings.plaid_client_name,
      env: settings.plaid_env,
      key: settings.plaid_public_key,
      product: settings.plaid_products,
      webhook: settings.plaid_webhooks_url,
      selectAccount: false,
      apiVersion: "v2",

      onLoad: () => {
        this.onLoad();
      },

      onSuccess: (publicToken, metadata) => {
        this.onSuccess(publicToken, metadata);
      },

      onExit: (err, metadata) => {
        if (err !== null) {
          this.onError(err, metadata);
          return;
        }
        this.onExit(metadata);
      }
    });
  }

  onClickOpen(e) {
    e.preventDefault();
    handler.open();
    this.setState({ isLoading: true });
  }

  onLoad() {
    this.setState({ isLoading: false });
  }

  onSuccess(publicToken, metadata) {
    this.props.setFormErrors("clear", null);
    this.props.createItem(publicToken, metadata.account_id);
    this.setState({ isLoading: false });
  }

  onExit(metadata) {
    this.setState({ isLoading: false });
  }

  onError(err, metadata) {
    this.setState({ isLoading: false });
  }

  render() {
    const {
      children,
      createItemInProgress,
      accountsLoading,
      error
    } = this.props;
    const isLoading = (!error && accountsLoading) || this.state.isLoading;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { onClick: this.onClickOpen })
    );

    return isLoading ? <Loader inline /> : childrenWithProps;
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
  accountsLoading: state.accounts.loading,
  error: state.formErrors.item
});

export default connect(mapStateToProps, {
  createItem,
  setFormErrors
})(PlaidLink);
