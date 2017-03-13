import React from 'react';
import { connect } from 'react-redux';
import { apiGetRequest, navigate } from 'actions'
import { BlockPage, Loading } from 'components'


/**
 * If user closed account in Donkies, it is able to see only
 * home dashboard.
 */
export function requireActiveAccount(Component) {

    class ActiveAccount extends React.Component {

        componentWillMount(){
            this.props.apiGetRequest('user')
        }

        render() {
            const { user, location } = this.props
            if (!user){
                return <Loading />
            }

            if (user.is_closed_account && location.pathname !== '/'){
                return (
                    <BlockPage
                        continueUrl="/"
                        message="You closed your account. You can view only dashboard home."
                        buttonText="Continue" />
                )    
            }
            return <Component {...this.props}/>
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
    )(ActiveAccount)

    ActiveAccount.propTypes = {
        apiGetRequest: PropTypes.func,
        location: PropTypes.object,
        navigate: PropTypes.func,
        user: PropTypes.object
    }
}

