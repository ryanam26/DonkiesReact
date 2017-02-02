import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { formToObject } from 'services/helpers'
import { apiGetRequest, editUserSettings, setFormErrors } from 'actions'
import { Button2, CardSimple, Input2, SelectSimple } from 'components'


class UserSettings extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    componentWillReceiveProps(nextProps){
        // Update user in Redux state.
        if (this.props.triggerEditUserSettings !== nextProps.triggerEditUserSettings){
            this.props.apiGetRequest('user')
        }
    }   

    getTransferAmountOptions(){
        const { settings } = this.props
        let arr = []

        for (let amount of settings.transfer_amounts){
            arr.push({text: `$${amount}`, value: amount})
        }
        return arr
    }

    onSubmit(e){
        e.preventDefault()
        this.props.setFormErrors('clear', null)

        const form = formToObject(e.target)
        this.props.editUserSettings(form)
    }

    render(){
        const { errors, inProgress, settings, user } = this.props

        if (!settings){
            return null
        }

        return (
            <div className="card">

                <form onSubmit={this.onSubmit} className="form-horizontal">
                    <div className="card-header">
                        <h2>{'Settings'}</h2>
                    </div>

                    <div className="card-body card-padding">
                        
                        <div className="form-group">
                            <label className="control-label col-sm-4">
                                {'Minimum transfer amount'}
                            </label>
                            <div className="col-sm-8">
                                <SelectSimple
                                    name="minimum_transfer_amount"
                                    options={this.getTransferAmountOptions()}
                                    value={user.minimum_transfer_amount} />
                            </div>
                        </div>
                        
                        <Button2 disabled={inProgress} />

                    </div>
                </form>
            </div>
        )
    }
}


UserSettings.propTypes = {
    apiGetRequest: PropTypes.func,
    editUserSettings: PropTypes.func,
    errors: PropTypes.object,
    inProgress: PropTypes.bool,
    setFormErrors: PropTypes.func,
    settings: PropTypes.object,
    triggerEditUserSettings: PropTypes.number,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    errors: state.formErrors.editUserSettings,
    inProgress: state.user.isSubmittingEditUserSettings,
    settings: state.settings,
    triggerEditUserSettings: state.user.triggerEditUserSettings,
    user: state.user.item
})

export default connect(mapStateToProps, {
    apiGetRequest,
    editUserSettings,
    setFormErrors
})(UserSettings)