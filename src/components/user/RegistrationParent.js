import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import autoBind from 'react-autobind'
import { apiGetRequest, navigate, login, registration, setFormErrors, registrationParent } from 'actions'
import { SETTINGS_LOGIN_URL } from 'services/api'
import { Alert, Checkbox, ErrorBlock, Input } from 'components'
import { formToObject } from 'services/helpers'
import FacebookButton from './private/FacebookButton'


/**
 * js/app.js had method that automatically removes "toggled" class
 * from lc-block and div started to be invisible.
 * Removed this method from app.js
 */
class RegistrationParent extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            email: null,
            password: null,
            hash: window.location.search.split('=')[1]
        }
    }

    componentWillMount(){
        if (this.props.isAuthenticated){
            this.props.navigate('/')
        }
        this.props.apiGetRequest('settings_login', {useToken: false}, SETTINGS_LOGIN_URL)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.isAuthenticated)
            nextProps.navigate('/download_app')

        if (nextProps.successMessage !== null){
            this.refs.form.reset()
            // Auto login after signup
            const { email, password } = this.state
            this.props.login(email, password)
        }
    }

    componentWillUnmount(){
        this.props.setFormErrors('clear', null)
    }

    onSubmit(e){

        e.preventDefault()
        this.props.setFormErrors('clear', null)

        let form = formToObject(e.target)

        this.setState({email: form.email, password: form.password})
        form.guid = this.state.hash
        this.props.registrationParent(form)
    }


    render(){
        const { errors, successMessage, settings } = this.props

        return (
            <div className="login-content">
                <div ref="block" className="lc-block toggled">

                    <FacebookButton settings={settings} />

                    <div className="lcb-form">

                        <form ref="form" onSubmit={this.onSubmit} target="">
                        <Input
                            name="first_name"
                            wrapperClass="input-group m-b-20"
                            zmdi="zmdi-account"
                            placeholder="First name"
                            errors={errors} />

                        <Input
                            name="last_name"
                            wrapperClass="input-group m-b-20"
                            zmdi="zmdi-account"
                            placeholder="Last name"
                            errors={errors} />

                        <Input
                            name="email"
                            wrapperClass="input-group m-b-20"
                            zmdi="zmdi-email"
                            placeholder="Email Address"
                            errors={errors} />

                        <Input
                            name="password"
                            type="password"
                            wrapperClass="input-group m-b-20"
                            zmdi="zmdi-male"
                            placeholder="Password"
                            errors={errors} />

                        <Input
                            name="state"
                            type="text"
                            wrapperClass="input-group m-b-20"
                            zmdi="zmdi-balance"
                            placeholder="State"
                            errors={errors} />

                        <Input
                            name="city"
                            type="text"
                            wrapperClass="input-group m-b-20"
                            zmdi="zmdi-city-alt"
                            placeholder="City"
                            errors={errors} />

                        <Input
                            name="address1"
                            type="text"
                            wrapperClass="input-group m-b-20"
                            zmdi="zmdi-local-store"
                            placeholder="Address"
                            errors={errors} />

                        <Input
                            name="postal_code"
                            type="text"
                            wrapperClass="input-group m-b-20"
                            zmdi="zmdi-file-text"
                            placeholder="Post code"
                            errors={errors} />
                        {
                            typeof(this.state.hash) === 'undefined' ||
                            !this.state.hash.length ?
                            (
                                <Input
                                    name="email_child"
                                    wrapperClass="input-group m-b-20"
                                    zmdi="zmdi-email"
                                    placeholder="Email Child"
                                    errors={errors} />
                            ) : null
                        }
                        <button
                            type="submit"
                            className="btn btn-login btn-success btn-float">

                            <i className="zmdi zmdi-check" />
                        </button>

                        {errors && <ErrorBlock errors={errors} />}

                        </form>

                    </div>

                    <div className="lcb-navigation">
                        <Link
                            to="/login"
                            data-ma-block="#l-login">

                            <i className="zmdi zmdi-long-arrow-right" />
                             <span>{'Sign in'}</span>
                        </Link>

                        <Link
                            to="/forgot_password"
                            data-ma-block="#l-forget-password">
                            <i>{'?'}</i> <span>{'Forgot Password'}</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

RegistrationParent.propTypes = {
    apiGetRequest: PropTypes.func,
    errors: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func,
    navigate: PropTypes.func,
    registrationParent: PropTypes.func,
    setFormErrors: PropTypes.func,
    settings: PropTypes.object,
    successMessage: PropTypes.string
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.formErrors.registration,
    settings: state.settingsLogin,
    successMessage: state.auth.registrationSuccessMessage
    })

export default connect(mapStateToProps, {
    apiGetRequest,
    login,
    navigate,
    registrationParent,
    setFormErrors
})(RegistrationParent)
