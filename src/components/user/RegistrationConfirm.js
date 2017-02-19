import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import autoBind from 'react-autobind'
import { navigate } from 'actions'
import { apiCall3, REGISTRATION_CONFIRM_URL } from 'services/api'
import { Alert, Loading } from 'components'


class RegistrationConfirm extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            isError: false,
            message: null,
            redirectMessage: null
        }
    }

    componentWillMount(){
        const q = this.props.query  
        if (!q.hasOwnProperty('id') || !q.hasOwnProperty('token')){
            this.setState({
                isError: true,
                message: 'Incorrect url'
            })
            return
        }
        const form = {id: q.id, token: q.token}
        this.sendForm(form)
    }

    async sendForm(form){
        const url = `${REGISTRATION_CONFIRM_URL}`  
        const data = {
            encrypted_id: form.id,
            confirmation_token: form.token
        }
        let response = await apiCall3(url, data, false)
        const result = await response.json()
        
        if (response.status === 400){
            this.setState({
                isError: true,
                message: result.non_field_errors || result.encrypted_id[0]
            })
        } else if (response.status === 201){
            this.setState({
                message: 'You have successfully confirmed your registration.'
            })
            this.redirectLogin()
        }
    }

    redirectLogin(){
        this.setState({
            redirectMessage: 'You will be redirected to login in a 5 seconds.'
        })
        setTimeout(() => this.props.navigate('/login'), 5000)
    }

    render(){
        const { isError, message, redirectMessage } = this.state
        
        if (!message){
            return <Loading />
        }

        const type = isError ? 'danger' : 'success'

        return (
            <div className="login-content">
                <div className="lc-block lc-block-alt toggled">
                    <Alert type={type} value={message} />
                    
                    {redirectMessage && 
                        <Alert type="success" value={redirectMessage} />}
                </div>
            </div>
        )
    }
}


RegistrationConfirm.propTypes = {
    navigate: PropTypes.func,
    query: PropTypes.object
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
  navigate
})(RegistrationConfirm)