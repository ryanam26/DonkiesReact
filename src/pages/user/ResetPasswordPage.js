import React, {Component, PropTypes} from 'react'
import { ResetPassword } from 'components'


/**
 * Not auth page
 */
export default class ResetPasswordPage extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { location } = this.props

        return <ResetPassword query={location.query} />
    }
}


ResetPasswordPage.propTypes = {
    location: PropTypes.object
}
