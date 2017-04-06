import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import {
    apiGetRequest, createAccount, navigate, setFormErrors } from 'actions'
import { formToObject } from 'services/helpers'
import {
    Alert, Button2, Loading, InputAutocomplete, Input2 } from 'components'


class AddLender extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            institutionId: null,
            showSuccess: false
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

    onSubmit(e){
        e.preventDefault()

        const { institutionId } = this.state
        this.props.setFormErrors('clear', null)
        
        const form = formToObject(e.target)

        form.institution_id = institutionId
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
                                </div>

                                <br />
                                <Input2
                                    name="account_number"
                                    label="Account number"
                                    placeholder="Enter your account number"
                                    errors={errors} />

                                <Input2
                                    name="additional_info"
                                    label="Additional info to included with payment"
                                    placeholder="Any additional info to include with your payment?"
                                    errors={errors} />

                                <Button2
                                    disabled={inProgress}
                                    type="submit"
                                    value="Submit" />
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