import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind'
import { apiGetRequest, navigate } from 'actions'
import { Modal, SetPrimaryAccount } from 'components'


/**
 * User should set primary debit account.
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

        hasPrimary(){
            const { accounts } = this.props
            for (let account of accounts){
                if (account.is_primary === true){
                    return true
                }
            }
            return false
        }

        render() {
            const { accounts } = this.props
            const { showModal } = this.state

            if (accounts && accounts.length > 1 && !this.hasPrimary()){
                return (
                    <wrap>
                        <Component {...this.props}/>

                        {showModal &&
                            <Modal
                                onClickClose={null}
                                showCloseButton={false}
                                visible
                                title="Set primary debit account">
                                
                                <SetPrimaryAccount accounts={accounts} />
                                
                            </Modal>  
                        }
                        
                    </wrap>
                )
            }
            return <Component {...this.props}/>
        }
    }

    const mapStateToProps = (state) => ({
        accounts: state.accounts.debitAccounts
    })

    return connect(
        mapStateToProps, {
            apiGetRequest,
            navigate
        }
    )(PrimaryAccount)

    PrimaryAccount.propTypes = {
        accounts: PropTypes.array,
        apiGetRequest: PropTypes.func,
        location: PropTypes.object,
        navigate: PropTypes.func
    }
}

