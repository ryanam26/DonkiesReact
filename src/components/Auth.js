import React from 'react';
import { connect } from 'react-redux';
import { navigate, getToken, apiGetRequest } from 'actions'


export function requireAuth(Component) {

    class Auth extends React.Component {

        componentWillMount() {
            this.checkAuth()
            if(window.localStorage.getItem('token') !== null) {
                this.props.apiGetRequest('user')
            }
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth()

            // Fix expired token
            if (this.props.token !== null && nextProps.token === null){
                window.location.reload()
            }
        }

        checkAuth() {
            let token = window.localStorage.getItem('token')
            if (token !== null){
                this.props.getToken()
                return
            }

            if (!this.props.isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname
                this.props.navigate('/login')
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true &&
                        <Component {...this.props}/>
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(
        mapStateToProps, {
            navigate,
            getToken,
            apiGetRequest
        }
    )(Auth)

    Auth.propTypes = {
        dispatch: PropTypes.func,
        getToken: PropTypes.func,
        apiGetRequest: PropTypes.func,
        isAuthenticated: PropTypes.bool,
        location: PropTypes.object,
        navigate: PropTypes.func,
        token: PropTypes.string
    }
}

