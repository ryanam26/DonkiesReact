import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { InputAutocompleteAsync, PlaidLink } from 'components'
import { INSTITUTIONS_SUGGEST_URL } from 'services/api'


class TestPageComponent extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        const { settings } = this.props
        if (!settings){
            return null
        }

        return (
            <PlaidLink>
                <button type="button">{'Add bank account'}</button>
            </PlaidLink>
        )
    }
}

TestPageComponent.propTypes = {
    settings: PropTypes.object
}

const mapStateToProps = (state) => ({
    settings: state.settings
})

export default connect(mapStateToProps, {
})(TestPageComponent)




// <InputAutocompleteAsync
//     name="name"
//     placeholder="my placeholder"
//     url={INSTITUTIONS_SUGGEST_URL} />