import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { CreateFundingSource } from 'components'


/**
 * This page is not used with Stripe.
 */
export default class CreateFundingSourcePage extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        const { location } = this.props

        return null

        return (
            <CreateFundingSource location={location} />
        )
    }
}


CreateFundingSourcePage.propTypes = {
    location: PropTypes.object
}
