import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import autoBind from 'react-autobind'
import { apiGetRequest, navigate, login, registrationStep1, setFormErrors } from 'actions'
import { SETTINGS_LOGIN_URL } from 'services/api'
import { Alert, Checkbox, ErrorBlock, Input } from 'components'
import { formToObject } from 'services/helpers'
/**
 * js/app.js had method that automatically removes "toggled" class
 * from lc-block and div started to be invisible.
 * Removed this method from app.js
 */
class Registration extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            email: null,
            password: null
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
            nextProps.navigate('/')

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
        this.props.registrationStep1(form)
    }


    render(){
        const { errors, successMessage, settings } = this.props

        return (
            <div className="login-content">
                <div ref="block" className="lc-block toggled">
                    <h1 style={{
                        color: 'white',
                        textShadow: '1px 1px 2px #666'
                    }}>Create account</h1>

                    <div className="lcb-form">

                        <form ref="form" onSubmit={this.onSubmit} target="">

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

                        <div className="m-b-10">
                            Already have an account?
                            <Link to="/login" className="m-l-5">
                                <span>{'Click Here'}</span>
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success">
                            Continue
                        </button>

                        {errors && <ErrorBlock errors={errors} />}

                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

Registration.propTypes = {
    apiGetRequest: PropTypes.func,
    errors: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func,
    navigate: PropTypes.func,
    registration: PropTypes.func,
    setFormErrors: PropTypes.func,
    settings: PropTypes.object,
    successMessage: PropTypes.string
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.formErrors.registrationStep1,
    settings: state.settingsLogin,
    successMessage: state.auth.registrationSuccessMessage
})

export default connect(mapStateToProps, {
    apiGetRequest,
    login,
    navigate,
    registrationStep1,
    setFormErrors
})(Registration)
