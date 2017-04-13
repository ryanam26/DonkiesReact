import React, {Component, PropTypes} from 'react'


export default class FacebookButton extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { settings } = this.props
        if (!settings){
            return null
        }

        return (
            <div style={{backgroundColor: '#fff'}}>
                <a href={settings.facebook_login_url}>
                    <i style={{fontSize: '40px'}} className="zmdi zmdi-facebook-box" />
                </a>
            </div>
        )
    }
}


FacebookButton.propTypes = {
    settings: PropTypes.object
}
