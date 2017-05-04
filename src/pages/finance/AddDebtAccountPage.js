import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { AddDebtAccount } from 'components' 


export default class AddDebtAccountPage extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        return (
            <AddDebtAccount />
        )
    }
}


AddDebtAccountPage.propTypes = {
}

