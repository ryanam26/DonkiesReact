import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import moment from "moment";

import CardSimple from "~Scripts/components/CardSimple";
import Loader from "~Scripts/components/Loader";
import TableSimple from "~Scripts/components/TableSimple";

class HomeTransactions extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  get primaryAccount() {
    const { accounts } = this.props;
    for (let account of accounts) {
      if (account.is_primary) {
        return account;
      }
    }
    return null;
  }

  /**
   * Get last 10 transactions for primary account.
   */
  get transactions() {
    const { transactions } = this.props;
    let arr = [];
    if (this.primaryAccount) {
      arr = transactions.filter(tr => tr.account_id === this.primaryAccount.id);
    } else {
      arr = [...transactions];
    }
    return arr;
  }

  getData() {
    let data = {};
    data.id = "transactions";
    data.header = ["DATE", "DESCRIPTION", "AMOUNT", "ROUND UP"];
    data.rows = [];

    for (let tr of this.transactions.slice(0, 10)) {
      let row = {};
      row.cols = [];

      let dt = moment(tr.date);

      let col = {
        value: dt.format("YYYY/MM/DD"),
        className: "f-500 c-cyan"
      };
      row.cols.push(col);

      col = { value: tr.name };
      row.cols.push(col);

      col = { value: `$${tr.amount}`, className: "f-500 c-cyan" };
      row.cols.push(col);

      col = { value: `$${tr.roundup}`, className: "f-500 c-cyan" };
      row.cols.push(col);

      data.rows.push(row);
    }
    return data;
  }

  render() {
    const { accounts, transactions } = this.props;

    if (!transactions || !accounts) {
      return <Loader />;
    }

    return (
      <CardSimple header="Transactions" cardClass="bgm-white c-black">
        <TableSimple data={this.getData()} />
      </CardSimple>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.debitAccounts,
  transactions: state.transactions.items
});

export default connect(mapStateToProps, {})(HomeTransactions);
