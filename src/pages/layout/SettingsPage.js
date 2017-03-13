import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { CardSimple, UserCloseAccount, UserSettings } from 'components'


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
                    <UserCloseAccount />
                </div>
            </div>
        )
    }
}


SettingsPage.propTypes = {
}
