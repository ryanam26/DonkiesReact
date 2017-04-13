import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import moment from 'moment'

import { CardSimple, LoadingInline, TableSimple } from 'components'


class HomeTransactions extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    get fundingSource(){
        const { accounts } = this.props
        for (let account of accounts){
            if (account.is_funding_source_for_transfer){
                return account
            }
        }
        return null
    }

    /**
     * Get last 10 transactions for funding source account.
     */
    get transactions(){
        const { transactions } = this.props
        let arr = []
        if (this.fundingSource){
            arr = transactions.filter(tr => tr.account_id === this.fundingSource.id)
        } else {
            arr = [...transactions]
        }
        return arr
    }

    getData(){
        let data = {}
        data.id = 'transactions'
        data.header = ['DATE', 'CATEGORY', 'DESCRIPTION', 'TRANSACTION AMOUNT', 'ROUND UP']
        data.rows = []

        for (let tr of this.transactions.slice(0, 10)){
            let row = {}
            row.cols = []
            
            let dt = moment(tr.date)

            let col = {value: dt.format('YYYY/MM/DD'), className: 'f-500 c-cyan'}
            row.cols.push(col)
            
            col = {value: tr.category}
            row.cols.push(col)

            col = {value: tr.description}
            row.cols.push(col)

            col = {value: `$${tr.amount}`, className: 'f-500 c-cyan'}
            row.cols.push(col)

            col = {value: `$${tr.roundup}`, className: 'f-500 c-cyan'}
            row.cols.push(col)

            data.rows.push(row)
        }
        return data
    }

    render(){
        const { accounts, transactions } = this.props

        if (!transactions || !accounts){
            return <LoadingInline />
        }

        return (
            <CardSimple
                header="Transactions"
                smallHeader="This will show the most recent transactions">

                <TableSimple data={this.getData()} />
            </CardSimple>
        )
    }
}


HomeTransactions.propTypes = {
    accounts: PropTypes.array,
    transactions: PropTypes.array    
}

const mapStateToProps = (state) => ({
    accounts: state.accounts.debitAccounts,
    transactions: state.transactions.items
})

export default connect(mapStateToProps, {
})(HomeTransactions)