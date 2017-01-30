import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { AddAccount } from 'components' 


export default class AddBankPage extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        return (
            <AddAccount />
        )
    }
}


AddBankPage.propTypes = {
}

