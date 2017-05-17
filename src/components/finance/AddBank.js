import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import Script from 'react-load-script'

import { navigate } from 'actions'
import { Alert, Button2, Loading, PlaidLink } from 'components'


class AddBank extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            showSuccess: false,
            isScriptLoaded: false,
            isScriptError: false
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.props.triggerItemCreated !== nextProps.triggerItemCreated){
            this.setState({showSuccess: true})
            setTimeout(() => {this.props.navigate('/accounts')}, 5000)
        }
    }

    onScriptError(){
        this.setState({isScriptError: true})
    }

    onScriptLoad(){
        this.setState({isScriptLoaded: true})
    }

    render(){
        const { settings } = this.props
        const { isScriptError,  isScriptLoaded, showSuccess } = this.state

        if (!settings){
            return <Loading />
        }

        if (isScriptError){
            const message = `
                We are sorry! We can not now process your request. 
                Please try again later.
            `
            return (
                <Alert
                    type="danger"
                    showClose={false}
                    value={message} />
            )
        }

        return (
            <wrap>

            <Script
                url="https://cdn.plaid.com/link/v2/stable/link-initialize.js"
                onError={this.onScriptError}
                onLoad={this.onScriptLoad} />

            <div className="card col-lg-6">

                {isScriptLoaded &&
                    <div className="form-horizontal">
                        <div className="card-header">
                            <h2>{'Add bank account'}</h2>
                        </div>

                        <div className="card-body card-padding">
                            {!showSuccess &&
                                <PlaidLink>
                                    <Button2
                                        type="button"
                                        text="Create bank account" />
                                </PlaidLink>
                            }

                            {showSuccess &&
                                <Alert
                                    type="success"
                                    value={'Bank account created!'} />}
                        </div>
                    </div>
                }
                
            </div>
            </wrap>
        )
    }
}


AddBank.propTypes = {
    navigate: PropTypes.func,
    settings: PropTypes.object,
    triggerItemCreated: PropTypes.number
}

const mapStateToProps = (state) => ({
    triggerItemCreated: state.items.triggerItemCreated,
    settings: state.settings
})

export default connect(mapStateToProps, {
    navigate
})(AddBank)