import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import {
    apiGetRequest, addLender, navigate, setFormErrors } from 'actions'
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
        }
    }

    componentWillMount(){
        this.props.apiGetRequest('debt_institutions')
    }

    componentWillReceiveProps(nextProps){
        if (this.props.trigger !== nextProps.trigger){
            this.refs.form.reset()
            this.setState({showSuccess: true})
            setTimeout(() => {this.props.navigate('/accounts')}, 3000)
        }
    }

    onSubmit(e){
        e.preventDefault()

        const { institutionId } = this.state
        
        const form = formToObject(e.target)
        if (form.account_number === ''){
            this.props.setFormErrors(
                'addLender', {'account_number': ['Please fill account number']}) 
            return           
        }
        
        form.institution_id = institutionId
        this.props.addLender(form)
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
                    showClose={false}
                    type="success"
                    value={'Lender created!'} />
            )
        }

        return (
            <div className="card col-lg-6">

                <div className="form-horizontal">
                    <div className="card-header">
                        <h2>{'Search for Lender'}</h2>
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
                                <br /><br />
                                <Input2
                                    name="account_number"
                                    placeholder="Account number"
                                    label="Account number"
                                    errors={errors} />

                                <div className="add-debt">
                                    <div className="bank-name">
                                        {this.institution.name}
                                    </div>
                                    
                                    <div className="po-box">
                                        {this.institution.box}
                                    </div>

                                    <div className="bank-address">
                                        {this.institution.address}
                                    </div>

                                    <div className="bank-http-link">
                                        <a href={this.institution.link} target="_blank">
                                            {this.institution.link}
                                        </a>
                                    </div>
                                    
                                    
                                    <br /><br />    

                                    <Button2
                                        type="submit"
                                        text="Add" />

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
    addLender: PropTypes.func,
    apiGetRequest: PropTypes.func,
    errors: PropTypes.object,
    inProgress: PropTypes.bool,
    institutions: PropTypes.array,
    navigate: PropTypes.func,
    setFormErrors: PropTypes.func,
    trigger: PropTypes.number
}

const mapStateToProps = (state) => ({
    errors: state.formErrors.addLender,
    inProgress: state.accounts.addLenderInProgress,
    institutions: state.institutions.debtInstitutions,
    trigger: state.lenders.triggerLenderCreated
})

export default connect(mapStateToProps, {
    apiGetRequest,
    addLender,
    navigate,
    setFormErrors
})(AddLender)