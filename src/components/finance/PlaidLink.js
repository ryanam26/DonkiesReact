import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { createItem } from 'actions'

let handler = null


class PlaidLink extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    componentDidMount(){
        const { settings } = this.props

        handler = Plaid.create({
            clientName: settings.plaid_client_name,
            env: settings.plaid_env,
            key: settings.plaid_public_key,
            product: settings.plaid_products,
            webhook: settings.plaid_webhooks_url,
            selectAccount: false,
            apiVersion: 'v2',
            
            onLoad: () => {
            },
            
            /**
             * Plaid Link onSuccess returns public_token.
             * It means Item already created in Plaid.
             * We need to send public_token to backend
             * to create Item in database.
             */
            onSuccess: (public_token, metadata) => {
                this.onSuccess(publicToken, metadata)
            },
            
            /**
             * The user exited the Link flow.
             */
            onExit: (err, metadata) => {
                if (err !== null) {
                    // The user encountered a Plaid API error prior to exiting.
                    this.onError(err, metadata)
                    return
                }
                // User exited Plaid Link.
                this.onExit(metadata)
            }
        })
    }

    /**
     * Open PlaidLink.
     */
    onClickOpen(){
        handler.open()
    }

    onSuccess(publicToken, metadata){
        this.props.createItem(publicToken)
    }

    onExit(metadata){

    }

    onError(err, metadata){

    }

    render(){
        const { children, settings } = this.props
        if (!settings){
            return null
        }

        const childrenWithProps = React.Children.map(children,
            (child) => React.cloneElement(child, {onClick: this.onClickOpen})
        )

        return (
            <wrap>
                {childrenWithProps}
            </wrap>
        )
    }
}


PlaidLink.propTypes = {
    children: PropTypes.node,
    createItem: PropTypes.func,
    settings: PropTypes.object
}

const mapStateToProps = (state) => ({
    settings: state.settings
})

export default connect(mapStateToProps, {
    createItem
})(PlaidLink)