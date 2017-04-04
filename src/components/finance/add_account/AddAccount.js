import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { createUUID } from 'services/helpers'
import { apiGetRequest, growlAddRequest, navigate } from 'actions'
import Institution from './Institution'



class AddAccount extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            institution: null,
            isInstitutionChosen: false,
            successMessage: null
        }
    }

    /**
     * User not yet selected institution in Autocomplete.
     */
    onFailInstitution(){
        this.setState({institution: null})
    }

    /**
     * User selects institution on Autocomplete.
     */
    onSelectInstitution(id, value){
        this.setState({institution: {id, name: value}})
    }

    /**
     * User clicked button and chosen institution.
     */
    onChooseInstitution(institution){
        this.setState({
            isInstitutionChosen: true,
            institution: institution,
        })
    }
   
    render(){
        const { institution, isInstitutionChosen } = this.state
        const { user } = this.props

        return (
            <div className="card col-lg-6">

                <div className="form-horizontal">
                    <div className="card-header">
                        <h2>{'Add bank account'}</h2>
                    </div>

                    <div className="card-body card-padding">
                        <Institution
                            institution={institution}
                            onChooseInstitution={this.onChooseInstitution}
                            onFailInstitution={this.onFailInstitution}
                            onSelectInstitution={this.onSelectInstitution}
                            isInstitutionChosen={isInstitutionChosen} />
                    </div>
                </div>
            </div>
        )
    }
}


AddAccount.propTypes = {
    apiGetRequest: PropTypes.func,
    growlAddRequest: PropTypes.func,
    navigate: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    user: state.user.item
})

export default connect(mapStateToProps, {
    apiGetRequest,
    growlAddRequest,
    navigate
})(AddAccount)
