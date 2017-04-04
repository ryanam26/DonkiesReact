import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { createItem } from 'actions'
import { LoadingInline } from 'components'


let handler = null


class PlaidLink extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            // Loading Plaid Link
            isLoading: true
        }
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
                this.onLoad()
            },
            
            /**
             * Plaid Link onSuccess returns publicToken.
             * It means Item already created in Plaid.
             * We need to send public_token to backend
             * to create Item in database.
             */
            onSuccess: (publicToken, metadata) => {
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
        this.setState({isLoading: true})
    }

    onLoad(){
        this.setState({isLoading: false})
    }

    onSuccess(publicToken, metadata){
        this.props.createItem(publicToken)
        this.setState({isLoading: false})
    }

    onExit(metadata){
        this.setState({isLoading: false})
        console.log(metadata)
    }

    onError(err, metadata){
        this.setState({isLoading: false})
        console.log(err, metadata)
    }

    render(){
        const { children, createItemInProgress } = this.props
        const isLoading = this.state.isLoading || createItemInProgress
        
        const childrenWithProps = React.Children.map(children,
            (child) => React.cloneElement(child, {onClick: this.onClickOpen})
        )

        return (
            <wrap>
                {isLoading ? <LoadingInline /> : childrenWithProps}
            </wrap>
        )
    }
}


PlaidLink.propTypes = {
    children: PropTypes.node,
    createItem: PropTypes.func,
    createItemInProgress: PropTypes.bool,
    settings: PropTypes.object
}

const mapStateToProps = (state) => ({
    createItemInProgress: state.items.createItemInProgress,
    settings: state.settings
})

export default connect(mapStateToProps, {
    createItem
})(PlaidLink)