import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Link } from 'react-router'


/**
 * Blocking component.
 * It shows message and button to continue.
 */
export default class BlockPage extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        const { buttonText, continueUrl, message } = this.props

        return (
            <div className="login-content">
                <div className="lc-block lc-block-alt toggled">
                    
                    <div className="lcb-form">
                        <p>{message}</p>

                            <Link 
                                to={continueUrl}
                                className="btn">

                                {buttonText}
                            </Link>
                    </div>

                    
                </div>
            </div>
        )
    }
}


BlockPage.propTypes = {
    buttonText: PropTypes.string,
    continueUrl: PropTypes.string,
    message: PropTypes.string
}
