import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import autoBind from 'react-autobind'
import { navigate } from 'actions'
import { apiCall3, RESET_PASSWORD_URL } from 'services/api'
import { formToObject } from 'services/helpers'
import { Alert, Input, ErrorBlock, Loading } from 'components'


class ResetPassword extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            id: null,
            errorMessage: null,
            redirectMessage: null,
            token: null
        }
    }

    componentWillMount(){
        const q = this.props.query  
        if (!q.hasOwnProperty('id') || !q.hasOwnProperty('token')){
            this.props.navigate('/login')
            return
        }
        this.setState({id: q.id, token: q.token})
    }

    onSubmit(e){
        e.preventDefault()
        this.setState({errorMessage: null})
        
        let form = formToObject(e.target)
        form.encrypted_id = this.state.id
        form.reset_token = this.state.token
        
        if (form.new_password.trim().length < 8){
            this.setState({errorMessage: 'The minimum password length is 8 symbols'})
            return
        }

        if (form.new_password !== form.new_password_confirm){
            this.setState({errorMessage: 'Passwords do not match'})
            return
        }
        this.sendForm(form)
    }

    async sendForm(form){
        const url = `${RESET_PASSWORD_URL}`  
        let response = await apiCall3(url, form, false)
        if (response.status === 400){
            const result = await response.json()
            let arr = Object.keys(result)
            let key = arr[0]
            this.setState({errorMessage: result[key][0]})
        } else if (response.status === 204){
            this.refs.form.reset()
            this.redirectLogin()
        }
    }

    redirectLogin(){
        this.setState({
            redirectMessage: 'You have set new password. You will be redirected to login in a 5 seconds.'
        })
        setTimeout(() => this.props.navigate('/login'), 5000)
    }

    render(){
        const { errorMessage, redirectMessage } = this.state
                
        return (
            <div className="login-content">
                <div className="lc-block toggled">
                    <div className="lcb-form">
                        <p className="text-left">
                            {'Set new password.'}
                        </p>

                        <form ref="form" onSubmit={this.onSubmit}>
                            <Input
                                type="password"
                                name="new_password"
                                wrapperClass="input-group m-b-20"
                                zmdi="zmdi-male"
                                placeholder="New password" />

                            <Input
                                type="password"
                                name="new_password_confirm"
                                wrapperClass="input-group m-b-20"
                                zmdi="zmdi-male"
                                placeholder="New password confirm" />

                            <button
                                type="submit"
                                href="#"
                                className="btn btn-login btn-success btn-float">
                                
                                <i className="zmdi zmdi-check" />
                            </button>

                        </form>
                    </div>
                    
                    {errorMessage &&
                        <Alert
                            type="danger"
                            value={errorMessage}
                            showClose={false} />}
                                        
                    {redirectMessage && 
                        <Alert type="success" value={redirectMessage} />}
                </div>
            </div>
        )
    }
}


ResetPassword.propTypes = {
    navigate: PropTypes.func,
    query: PropTypes.object
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
    navigate
})(ResetPassword)