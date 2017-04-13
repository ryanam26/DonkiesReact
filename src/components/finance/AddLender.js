import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import {
    apiGetRequest, createAccount, navigate, setFormErrors } from 'actions'
import { formToObject } from 'services/helpers'
import {
    Alert,
    Button2,
    ErrorBlock,
    Loading,
    InputAutocomplete,
    Input2 } from 'components'


class AddLender extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            institutionId: null,
            showSuccess: false,
            numAccounts: 1
        }
    }

    componentWillMount(){
        this.props.apiGetRequest('debt_institutions')
    }

    componentWillReceiveProps(nextProps){
        if (this.props.triggerAccountCreated !== nextProps.triggerAccountCreated){
            this.refs.form.reset()
            this.setState({showSuccess: true})
            setTimeout(() => {this.props.navigate('/accounts')}, 3000)
        }
    }

    onClickPlus(){
        this.setState({numAccounts: this.state.numAccounts + 1})
    }

    onClickMinus(){
        this.setState({numAccounts: this.state.numAccounts - 1})   
    }
    
    /**
     * form.accounts = [
     *  {
     *      account_number: ...,
     *      additional_info: ...,
     *      institution_id: ...
     *  },
     * ]
     */
    onSubmit(e){
        e.preventDefault()

        const { institutionId } = this.state
        this.props.setFormErrors('clear', null)
        
        let map = {}
        for (let el of e.target.elements){
            let name = el.name.replace('[]', '')
            
            if (map.hasOwnProperty(name)){
                map[name].push(el.value)
            } else {
                map[name] = [el.value]
            }

            if (name === 'account_number' && el.value.trim().length === 0){
                this.props.setFormErrors(
                    'createAccount',
                    {non_field_errors: ['Account number can not be empty.']})
                return
            }
        }

        let arr = []
        for (let i=0; i<map.account_number.length; i++){
            let obj = {
                account_number: map.account_number[i],
                additional_info: map.additional_info[i],
                institution_id: institutionId
            }
            arr.push(obj)
        }

        const form = {}
        form.accounts = arr
        this.props.createAccount(form)
    }

    onSuccess(id, value){
        this.setState({institutionId: id})
    }

    onFail(){
        this.setState({institutionId: null})
    }

    /**
     * Institutions suggestions for Autocomplete.
     */
    get suggestions(){
        const { institutions } = this.props
        let arr = []
        for (let i of institutions){
            arr.push({id: i.id, value: i.name})
        }
        return arr
    }

    /**
     * Returns institution object by id.
     * id get from state.
     */
    get institution(){
        const { institutions } = this.props
        const { institutionId } = this.state
        if (!institutionId){
            return null
        }
        return institutions.filter(i => i.id === institutionId)[0]
    }

    get numAccounts(){
        const { numAccounts } = this.state
        let arr = []
        for (let i=0; i<numAccounts; i++){
            arr.push(i)
        }
        return arr
    }

    render(){
        const { errors, institutions, inProgress } = this.props
        const { institutionId, showSuccess } = this.state

        if (!institutions){
            return <Loading />
        }

        if (showSuccess){
            return (
                <Alert
                    type="success"
                    value={'Debt account created!'} />
            )
        }

        return (
            <div className="card col-lg-6">

                <div className="form-horizontal">
                    <div className="card-header">
                        <h2>{'Add debt account'}</h2>
                    </div>

                    <div className="card-body card-padding">
                        <InputAutocomplete
                            disabled={inProgress}
                            type="text"
                            name="institution"
                            suggestions={this.suggestions}
                            onSuccess={this.onSuccess}
                            onFail={this.onFail}
                            placeholder="Input your bank" />

                        {institutionId &&
                            <form ref="form" onSubmit={this.onSubmit}>
                                <div className="add-debt">
                                    <div className="bank-name">
                                        {this.institution.name}
                                    </div>
                                    
                                    <div className="bank-address">
                                        {this.institution.address}
                                    </div>
                                    
                                    {this.numAccounts.map((v, index) => {
                                        return (
                                            <div key={index} className="account-wrapper">
                                                <Input2
                                                    name="account_number[]"
                                                    label="Account number"
                                                    placeholder="Enter your account number" />

                                                <Input2
                                                    name="additional_info[]"
                                                    label="Additional info to included with payment"
                                                    placeholder="Any additional info to include with your payment?" />
                                            </div>
                                        )                 
                                    })}
                                    
                                    <button
                                        onClick={this.onClickPlus}
                                        type="button"
                                        className="btn btn-primary btn-sm waves-effect">
                                        {'+'}
                                    </button>

                                    {this.state.numAccounts > 1 &&
                                        <button
                                            onClick={this.onClickMinus}
                                            type="button"
                                            className="btn btn-primary btn-sm waves-effect m-l-10">
                                            {'-'}
                                        </button>
                                    }
                                    
                                    <br /><br />    

                                    <Button2
                                        type="submit"
                                        text="Submit" />

                                    <ErrorBlock errors={errors} />

                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


AddLender.propTypes = {
    apiGetRequest: PropTypes.func,
    createAccount: PropTypes.func,
    errors: PropTypes.object,
    inProgress: PropTypes.bool,
    institutions: PropTypes.array,
    navigate: PropTypes.func,
    setFormErrors: PropTypes.func,
    triggerAccountCreated: PropTypes.number
}

const mapStateToProps = (state) => ({
    errors: state.formErrors.createAccount,
    inProgress: state.accounts.createAccountInProgress,
    institutions: state.institutions.debtInstitutions,
    triggerAccountCreated: state.accounts.triggerAccountCreated
})

export default connect(mapStateToProps, {
    apiGetRequest,
    createAccount,
    navigate,
    setFormErrors
})(AddLender)