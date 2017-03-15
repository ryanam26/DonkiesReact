import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { accountsSetNumber } from 'actions'
import { formToObject } from 'services/helpers'
import { Button2, Input } from 'components'


class SetAccountNumber extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    onSubmit(e){
        const { account } = this.props

        e.preventDefault()
        const form = formToObject(e.target)
        if (form.account_number.trim().length === 0){
            return
        }
        this.props.accountsSetNumber(account.id, form)
    }

    render(){
        const { account, inProgress } = this.props
        
        return (
            <div>
                <form ref="form" onSubmit={this.onSubmit}>
                    <Input
                        errors={null}
                        name="account_number" />

                    <Button2
                        disabled={inProgress}
                        type="submit"
                        text="Set account number" />

                </form>
            </div>
        )
    }
}


SetAccountNumber.propTypes = {
    account: PropTypes.object,
    accountsSetNumber: PropTypes.func,
    inProgress: PropTypes.bool
}

const mapStateToProps = (state) => ({
    inProgress: state.accounts.setAccountNumberInProgress
})

export default connect(mapStateToProps, {
    accountsSetNumber
})(SetAccountNumber)