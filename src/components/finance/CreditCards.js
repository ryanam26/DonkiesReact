import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Link } from 'react-router'
import classNames from 'classnames'
import { apiGetRequest, accountsSetPrimary, navigate } from 'actions'
import { CREDIT } from 'constants'

import { getDollarAmount } from 'services/helpers'
import {
    ConfigureAccounts,
    CardSimple,
    LoadingInline,
    Modal,
    TableSimple } from 'components'


class CreditCards extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    onClickConfigure(){
        this.props.navigate('/configure_accounts')
    }

    onClickSetPrimary(params){
        const { id } = params
        this.props.accountsSetPrimary(id)
    }

    get creditCards(){
        const { accounts } = this.props
        if (!accounts){
            return []
        }
        return accounts.filter(account => account.type === CREDIT)
    }

    hasCreditCards(){
        if (this.creditCards.length > 0){
            return true
        }
        return false
    }

    /**
     * Returns col object for table depends on account.
     */
    getColForPrimary(account){
        let cn, params, onClick, value, title
        if (account.is_primary){
            cn = 'zmdi-money'
            params = null
            onClick = null
            title = 'Primary account'
        } else {
            cn = 'zmdi-assignment fake-link'
            params = {id: account.id}
            onClick = this.onClickSetPrimary
            title = 'Set account as primary'
        }

        cn = classNames('zmdi', cn)
        value = <i title={title} style={{fontSize: '25px'}} className={cn} />
        
        return {value, onClick, params}
    }

    /**
     * Prepare data for table.
     */
    getData(accounts){
        let data = {}
        data.id = 'debitAccounts'
        data.header = [
            'BANK', 'ACCOUNT NAME', 'BALANCE', 'TRANSACTIONS', 'PRIMARY']
        data.rows = []

        for (let a of accounts){
            let row = {}
            row.cols = []

            let col
            col = {
                value: <a target="_blank" href={a.institution.url}>{a.institution.name}</a>
            }
            row.cols.push(col)
            row.cols.push({value: a.name})
            row.cols.push({value: getDollarAmount(a.balance)})

            const link = (<Link to={'/transactions?account_id=' + a.id}>
                            <i style={{fontSize: '25px'}} className="zmdi zmdi-view-list" />
                        </Link>)
            row.cols.push({value: link})
            
            col = this.getColForPrimary(a)
           
            row.cols.push(col)
            data.rows.push(row)
        }
        return data
    }

    render(){
        const { accounts } = this.props
        
        return (
            <wrap>
                <CardSimple
                    header="Credit Cards"
                    headerClass="m-b-20"
                    isContentToBody={false}>
                                    
                    <Link to="/transactions" className="btn btn-default btn-sm waves-effect m-r-5 m-t-5">
                        {'View Transactions'}
                    </Link>
                    
                    <Link to="/add_bank" className="btn bgm-lightblue btn-icon-text btn-sm waves-effect m-r-5 m-t-5">
                        <i className="zmdi zmdi-plus" />
                        {'Add Credit Card'}
                    </Link>
                    

                    {this.hasCreditCards() &&
                        <button
                            onClick={this.onClickConfigure}
                            className="btn bgm-gray btn-icon-text btn-sm waves-effect m-r-5 m-t-5">
                            <i className="zmdi zmdi-settings" />
                            {'Configure'}
                        </button>
                    }
                </CardSimple>

                {this.hasCreditCards() && <TableSimple data={this.getData(this.creditCards)} />}
                
            </wrap>
        )
    }
}


CreditCards.propTypes = {
    accounts: PropTypes.array,
    accountsNotActive: PropTypes.array,
    accountsSetPrimary: PropTypes.func,
    apiGetRequest: PropTypes.func,
    navigate: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    accounts: state.accounts.debtAccounts,
    user: state.user.item
})

export default connect(mapStateToProps, {
    accountsSetPrimary,
    apiGetRequest,
    navigate
})(CreditCards)