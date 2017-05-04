import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Link } from 'react-router'
import { getDollarAmount } from 'services/helpers'
import { navigate } from 'actions'
import {
    ConfigureAccounts,
    CardSimple,
    Modal,
    SetAccountNumber,
    ShareEdit,
    TableSimple } from 'components'


class DebtAccounts extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            isShowShareModal: false,
            isShowAccountNumberModal: false,
            account: null
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.props.triggerSetAccountNumber !== nextProps.triggerSetAccountNumber){
            this.setState({isShowAccountNumberModal: false})
        }
    }

    onClickShowShareModal(){
        this.setState({isShowShareModal: true})
    }

    onClickCloseShareModal(){
        this.setState({isShowShareModal: false})
    }

    onClickShowAccountNumberModal(account){
        this.setState({
            account: account,
            isShowAccountNumberModal: true
        })
    }

    onClickCloseAccountNumberModal(){
        this.setState({isShowAccountNumberModal: false})
    }

    onClickConfigure(){
        this.props.navigate('/configure_accounts')
    }
    
    hasAccounts(){
        const { accounts } = this.props

        if (accounts && accounts.length > 0){
            return true
        }
        return false
    }

    /**
     * Prepare data for table.
     */
    getData(accounts){
        let data = {}
        data.id = 'debtAccounts'
        data.header = [
            'LENDER',
            'ACCOUNT NAME',
            'ACCOUNT NUMBER',
            'TRANSFER SHARE'
        ]
        data.rows = []

        for (let a of accounts){
            let row = {}
            row.cols = []

            let account_number
            if (a.account_number){
                account_number = `...${a.account_number}`
            } else {
                account_number = <i style={{fontSize: '25px', cursor: 'pointer'}} onClick={this.onClickShowAccountNumberModal.bind(null, a)} className="zmdi zmdi-plus" />
            }

            let col
            col = {
                value: <a target="_blank" href={a.institution.url}>{a.institution.name}</a>
            }
            row.cols.push(col)
            row.cols.push({value: a.name})
            row.cols.push({value: account_number})
            row.cols.push({value: `${a.transfer_share}%`})
            data.rows.push(row)
        }
        return data
    }

    render(){
        const {
            isShowConfigureModal,
            isShowShareModal,
            isShowAccountNumberModal } = this.state
        
        const { accounts, user } = this.props
        
        let setAccountNumberTitle
        if (this.state.account){
            setAccountNumberTitle = `Set account number for "${this.state.account.name}"`
        } else {
            setAccountNumberTitle = ''
        }

        return (
            <wrap>
                {this.hasAccounts() &&
                    <Modal
                        onClickClose={this.onClickCloseConfigureModal}
                        visible={isShowConfigureModal}
                        title="Configure accounts">
                            
                            <div />
                            {/*<ConfigureAccounts />*/}
                    </Modal>  
                }

                {(this.hasAccounts() && accounts.length > 1) &&
                    <Modal
                        onClickClose={this.onClickCloseShareModal}
                        visible={isShowShareModal}
                        title="Edit share of transfers">
                            
                            <ShareEdit accounts={accounts} />
                    </Modal>  
                }
                
                {this.hasAccounts() &&
                    <Modal
                        onClickClose={this.onClickCloseAccountNumberModal}
                        visible={isShowAccountNumberModal}
                        title={setAccountNumberTitle}>
                            
                            <SetAccountNumber account={this.state.account} />
                    </Modal>  
                }

                <CardSimple
                    header="Debt accounts"
                    headerClass="m-b-20"
                    isContentToBody={false}>
                                    
                    <Link to="/add_debt_account" className="btn bgm-lightblue btn-icon-text btn-sm waves-effect m-r-5 m-t-5">
                        <i className="zmdi zmdi-plus" />
                        {'Add debt account'}
                    </Link>

                    {(this.hasAccounts() && accounts.length > 1) &&
                        <button
                            onClick={this.onClickShowShareModal}
                            className="btn bgm-lightblue btn-icon-text btn-sm waves-effect m-r-5 m-t-5">
                            <i className="zmdi zmdi-edit" />
                            {'Edit share'}
                        </button>
                    }

                    {this.hasAccounts() &&
                        <button
                            onClick={this.onClickConfigure}
                            className="btn bgm-gray btn-icon-text btn-sm waves-effect m-r-5 m-t-5">
                            <i className="zmdi zmdi-settings" />
                            {'Configure'}
                        </button>
                    }
                    
                </CardSimple>

                {this.hasAccounts() && <TableSimple data={this.getData(accounts)} />}
                
            </wrap>
        )
    }
}


DebtAccounts.propTypes = {
    accounts: PropTypes.array,
    accountsNotActive: PropTypes.array,
    navigate: PropTypes.func,
    triggerSetAccountNumber: PropTypes.number,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    accounts: state.accounts.debtAccounts,
    accountsNotActive: state.accounts.debtAccountsNotActive,
    triggerSetAccountNumber: state.accounts.triggerSetAccountNumber,
    user: state.user.item
})

export default connect(mapStateToProps, {
    navigate
})(DebtAccounts)