import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { CardSimple, UserSettings } from 'components'


export default class SettingsPage extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        return (
            <div className="row">
                <div className="col-sm-6">
                    <UserSettings />
                </div>                

                <div className="col-sm-6">
                    <CardSimple
                        header={'Unlink All Accounts \u0026 Refund All Change'}
                        headerClass="m-b-20"
                        isContentToBody={false}>

                        <button className="btn bgm-red btn-icon-text btn-sm waves-effect m-r-5">
                            <i className="zmdi zmdi-delete" />
                            {'Remove and Refund'}
                        </button>
                    </CardSimple>
                </div>
            </div>
        )
    }
}


SettingsPage.propTypes = {
}
