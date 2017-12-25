import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";

import {
  accountsSetActive,
  apiGetRequest,
  deleteItem
} from "~Scripts/actions/bank";

import { setFormErrors } from "~Scripts/actions";

import ErrorBlock from "~Scripts/components/ErrorBlock";
import Loader from "~Scripts/components/Loader";
import SelectSimple from "~Scripts/components/Select";
import TableSimple from "~Scripts/components/TableSimple";

import { DEBIT, DEBT } from "~Scripts/constants/common";

class ConfigureAccounts extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      activeItemId: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.triggerItemDeleted !== nextProps.triggerItemDeleted) {
      this.props.apiGetRequest("accounts");
      this.props.apiGetRequest("items");
      this.props.apiGetRequest("transactions");

      this.props.growlAddRequest({
        message: "Financial institution deleted",
        type: "success"
      });
      this.setState({ activeItemId: null });
    }
  }

  onClickRemoveItem() {
    this.clearErrors();
    const { activeItemId } = this.state;
    if (!activeItemId) {
      return;
    }
    const item = this.getItemById(activeItemId);
    this.props.deleteItem(item.guid);
  }

  /**
   * If account is active, set not active and vice versa.
   */
  onClickAccountSetActive(id) {
    this.clearErrors();
    let account = this.getAccountById(id);
    let isActive = !account.is_active;
    const form = { is_active: isActive };
    this.props.accountsSetActive(id, form);
  }

  /**
   * Callback function, passed to SelectSimple
   */
  onSelectItem(value) {
    this.clearErrors();
    if (value !== "") {
      this.setState({ activeItemId: parseInt(value) });
    } else {
      this.setState({ activeItemId: null });
    }
  }

  getItemById(id) {
    const { items } = this.props;
    for (let item of items) {
      if (item.id === id) {
        return item;
      }
    }
    return null;
  }

  clearErrors() {
    this.props.setFormErrors("clear", null);
  }

  getAccountById(id) {
    const { accounts, accountsNotActive } = this.props;
    for (let a of accounts) {
      if (a.id === id) {
        return a;
      }
    }

    for (let a of accountsNotActive) {
      if (a.id === id) {
        return a;
      }
    }
    return null;
  }

  /**
   * Options for SelectSimple for items
   */
  getItemsOptions() {
    const { items } = this.props;

    let data = [];
    data.push({ value: "", text: "--- Select financial institution" });

    for (let item of items) {
      if (item.is_active) {
        data.push({ value: item.id, text: item.name });
      }
    }

    if (data.length === 1) {
      window.location.reload();
    }

    return data;
  }

  renderAccounts() {
    const { accounts, errors } = this.props;
    const { activeItemId } = this.state;
    if (!activeItemId || accounts.length === 0) {
      return null;
    }

    let data = {};

    data.id = "accounts";
    data.header = ["ACCOUNT", "TYPE", ""];
    data.rows = [];

    for (let a of accounts.filter(a => a.item === activeItemId)) {
      let row = {};
      row.cols = [];

      // let btn = (
      //   <i
      //     onClick={this.onClickAccountSetActive.bind(null, a.id)}
      //     style={{ fontSize: "20px", cursor: "pointer" }}
      //     className="zmdi zmdi-delete"
      //     title="deactivate"
      //   />
      // );

      let btn = null;

      row.cols.push({ value: a.name });
      row.cols.push({ value: a.type });
      row.cols.push({ value: btn });
      data.rows.push(row);
    }
    return (
      <React.Fragment>
        <h4 className="m-t-20">{"Active accounts"}</h4>
        <ErrorBlock errors={errors} />
        <TableSimple data={data} />
      </React.Fragment>
    );
  }

  renderAccountsNotActive() {
    const { accountsNotActive, errors } = this.props;
    const { activeItemId } = this.state;
    if (!activeItemId || accountsNotActive.length === 0) {
      return null;
    }

    let data = {};

    data.id = "accountsNotActive";
    data.header = ["ACCOUNT", "TYPE", ""];
    data.rows = [];

    for (let a of accountsNotActive.filter(a => a.item === activeItemId)) {
      let row = {};
      row.cols = [];

      let btn = (
        <i
          onClick={this.onClickAccountSetActive.bind(null, a.id)}
          style={{ fontSize: "20px", cursor: "pointer" }}
          className="zmdi zmdi-assignment"
          title="activate"
        />
      );

      row.cols.push({ value: a.name });
      row.cols.push({ value: a.type });
      row.cols.push({ value: btn });
      data.rows.push(row);
    }

    if (data.rows.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <h4 className="m-t-20">{"Non-active accounts"}</h4>
        <ErrorBlock errors={errors} />
        <TableSimple data={data} />
      </React.Fragment>
    );
  }

  render() {
    const { activeItemId, isLoading } = this.state;
    const {
      accounts,
      accountsNotActive,
      deleteItemInProgress,
      items
    } = this.props;

    if (isLoading || !items || !accounts || !accountsNotActive) {
      return <Loader inline />;
    }

    return (
      <div className="card p-30">
        <h3>{"Configure accounts"}</h3>

        <div className="row">
          <div className="col-md-6">
            <SelectSimple
              name="account"
              onChange={this.onSelectItem}
              options={this.getItemsOptions()}
            />
          </div>

          {activeItemId && (
            <div className="col-md-6">
              {deleteItemInProgress ? (
                <Loader inline />
              ) : (
                <button
                  onClick={this.onClickRemoveItem}
                  className="btn bgm-red btn-icon-text btn-sm waves-effect m-t-5"
                >
                  <i className="zmdi zmdi-delete" />
                  {"Remove financial institution"}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-sm-6">{this.renderAccounts()}</div>

          <div className="col-sm-6">{this.renderAccountsNotActive()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  accountsNotActive: state.accounts.accountsNotActive,
  errors: state.formErrors.configureAccounts,
  deleteItemInProgress: state.items.deleteItemInProgress,
  items: state.items.items,
  triggerItemDeleted: state.items.triggerItemDeleted
});

export default connect(mapStateToProps, {
  accountsSetActive,
  apiGetRequest,
  deleteItem,
  setFormErrors
})(ConfigureAccounts);
