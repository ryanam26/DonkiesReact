import React from 'react';
import { connect } from 'react-redux';
import { apiGetRequest, navigate } from 'actions'
import { BlockPage, Loading } from 'components'


export function requireSignupCompleted(Component) {

    class SignupCompleted extends React.Component {

        componentWillMount(){
            this.props.apiGetRequest('user')
        }

        componentWillReceiveProps(nextProps) {
        }

        /**
         * @returns {string} - returns url without query params.
         */
        getAllowedPath(url){
            let index = url.indexOf('?')
            if (index === -1){
                return url
            }
            return url.slice(0, index)
        }

        get isSignupCompleted(){
            const { user } = this.props
            if (!user.signup_steps){
                return true
            }

            for (let obj of user.signup_steps){
                if (!obj.is_completed){
                    return false
                }
            } 
            return true
        }

        getNextStep(){
            const { user } = this.props

            for (let obj of user.signup_steps){
                if (!obj.is_completed){
                    return obj
                }
            }
        }

        render() {
            const { user, location } = this.props
            if (!user){
                return <Loading />
            }

            if (user.is_signup_completed){
                return <Component {...this.props}/>
            }

            if (this.isSignupCompleted){
                return <Component {...this.props}/>
            }

            const nextStep = this.getNextStep()

            if (this.getAllowedPath(nextStep.allowed_url) === `/${location.pathname}`){
                return <Component {...this.props}/>   
            }

            return (
                <BlockPage
                    continueUrl={nextStep.allowed_url}
                    message={nextStep.message}
                    buttonText="Continue" />
            )
        }
    }

    const mapStateToProps = (state) => ({
        user: state.user.item
    })

    return connect(
        mapStateToProps, {
            apiGetRequest,
            navigate
        }
    )(SignupCompleted)

    SignupCompleted.propTypes = {
        apiGetRequest: PropTypes.func,
        location: PropTypes.object,
        navigate: PropTypes.func,
        user: PropTypes.object
    }
}

