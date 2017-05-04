import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { accountsSetPrimary } from 'actions'
import { formToObject } from 'services/helpers'
import { Button2, SelectSimple } from 'components'


/**
 * Used in Modal when user required to set
 * primary account.
 */
class SetPrimaryAccount extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    onSelect(value){
    }

    onSubmit(e){
        e.preventDefault()
        const form = formToObject(e.target)
        if (form.primary_account.trim().length === 0){
            return
        }
        this.props.accountsSetPrimary(form.primary_account)
    }
    
    /**
     * Select options.
     */
    getOptions(){
        const { accounts } = this.props

        let data = []
        data.push({value: '', text: '--- Select primary account'})
        
        for (let account of accounts){
            let text = `${account.name} ($${account.balance})`
            data.push({value: account.id, text: text})
        }
        return data
    }

    render(){
        const { inProgress } = this.props
        
        return (
            <div>
                <form ref="form" onSubmit={this.onSubmit}>
                    <SelectSimple
                        name="primary_account"
                        onChange={this.onSelect}
                        options={this.getOptions()} />

                    <br />
                    <br />
                    <Button2
                        disabled={inProgress}
                        type="submit"
                        text="Submit" />

                </form>
            </div>
        )
    }
}


SetPrimaryAccount.propTypes = {
    accounts: PropTypes.array,
    accountsSetPrimary: PropTypes.func,
    inProgress: PropTypes.bool
}

const mapStateToProps = (state) => ({
    inProgress: state.accounts.setPrimaryAccountInProgress
})

export default connect(mapStateToProps, {
    accountsSetPrimary
})(SetPrimaryAccount)