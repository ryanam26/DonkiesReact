import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind'
import { apiGetRequest, navigate } from 'actions'
import { CREDIT } from 'constants'
import { Modal, SetPrimaryAccount } from 'components'


/**
 * User should set primary account (debit account or credit card).
 */
export function requirePrimaryAccount(Component) {

    class PrimaryAccount extends React.Component {
        constructor(props){
            super(props)
            autoBind(this)

            this.state = {
                showModal: true
            }

        }

        componentWillMount(){
            this.props.apiGetRequest('accounts')
        }

        /**
         * Debit accounts and credit cards.
         */
        get accounts(){
            const { debitAccounts, debtAccounts } = this.props
            if (!debitAccounts || !debtAccounts){
                return []
            }

            let arr = []
            for (let account of debitAccounts){
                arr.push(account)
            }

            for (let account of debtAccounts.filter(a => a.type === CREDIT)){
                arr.push(account)
            }
            return arr
        }

        hasPrimary(){
            for (let account of this.accounts){
                if (account.is_primary === true){
                    return true
                }
            }
            return false
        }

        render() {
            const { showModal } = this.state

            if (this.accounts.length > 1 && !this.hasPrimary()){
                return (
                    <wrap>
                        <Component {...this.props}/>

                        {showModal &&
                            <Modal
                                onClickClose={null}
                                showCloseButton={false}
                                visible
                                title="Set primary account">
                                
                                <SetPrimaryAccount accounts={this.accounts} />
                                
                            </Modal>  
                        }
                        
                    </wrap>
                )
            }
            return <Component {...this.props}/>
        }
    }

    const mapStateToProps = (state) => ({
        debitAccounts: state.accounts.debitAccounts,
        debtAccounts: state.accounts.debtAccounts
    })

    return connect(
        mapStateToProps, {
            apiGetRequest,
            navigate
        }
    )(PrimaryAccount)

    PrimaryAccount.propTypes = {
        apiGetRequest: PropTypes.func,
        debitAccounts: PropTypes.array,
        debtAccounts: PropTypes.array,
        location: PropTypes.object,
        navigate: PropTypes.func
    }
}

