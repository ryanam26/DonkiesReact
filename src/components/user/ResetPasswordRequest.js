import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import autoBind from 'react-autobind'
import { resetPasswordRequest, setFormErrors } from 'actions'
import { formToObject } from 'services/helpers'
import { Alert, Checkbox, Input, ErrorBlock } from 'components'


class ResetPasswordRequest extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            message: null
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.props.trigger !== nextProps.trigger){
            this.refs.form.reset()

            this.setState({
                message: 'Please check your email for further instruction.'
            })
        }
    }

    onSubmit(e){
        e.preventDefault()
        this.props.setFormErrors('clear', null)
        this.setState({message: null})

        let form = formToObject(e.target)
        this.props.resetPasswordRequest(form)
    }

    render(){
        const { errors } = this.props
        const { message } = this.state

        return (
            <div className="login-content">
                <div className="lc-block toggled">
                    <div className="lcb-form">
                        <p className="text-left">
                            {'Please input your email.'}
                        </p>

                        <form ref="form" onSubmit={this.onSubmit}>
                            <Input
                                name="email"
                                errors={errors}
                                wrapperClass="input-group m-b-20"
                                zmdi="zmdi-email"
                                placeholder="Email Address" />

                            <button
                                type="submit"
                                href="#"
                                className="btn btn-login btn-success btn-float">
                                
                                <i className="zmdi zmdi-check" />
                            </button>

                            {errors && <ErrorBlock errors={errors} />}

                        </form>

                        {message && <Alert type="success" value={message} />}

                    </div>

                    <div className="lcb-navigation">
                        <Link
                            to="/login"
                            data-ma-block="#l-login">

                            <i className="zmdi zmdi-long-arrow-right" />
                             <span>{'Sign in'}</span>
                        </Link>

                        <Link
                            to="/registration"
                            data-ma-block="#l-register">
                            
                            <i className="zmdi zmdi-plus" />
                            <span>{'Register'}</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

ResetPasswordRequest.propTypes = {
    errors: PropTypes.object,
    resetPasswordRequest: PropTypes.func,
    setFormErrors: PropTypes.func,
    trigger: PropTypes.number
}

const mapStateToProps = (state) => ({
    errors: state.formErrors.resetPasswordRequest,
    trigger: state.user.triggerResetPasswordRequest
})

export default connect(mapStateToProps, {
    resetPasswordRequest,
    setFormErrors
})(ResetPasswordRequest)