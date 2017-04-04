import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import classNames from 'classnames'


export default class LoadingInline extends Component{
    static get defaultProps() {
        return {
            className: '',
            message: null,
            radius: 20
        }
    }

    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        const { className, message, radius } = this.props

        const cn = classNames('preloader pls-blue', className)

        return (
            <wrap>
                <div className={cn}>
                    <svg className="pl-circular" viewBox="25 25 50 50">
                        <circle className="plc-path" cx="50" cy="50" r={radius} />
                    </svg>
                </div>

                {message && <p>{message}</p>}
            </wrap>
        )
    }
}


LoadingInline.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    radius: PropTypes.number
}

