import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Link } from 'react-router'
import { ConfigureAccounts } from 'components'


export default class ConfigureAccountsPage extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        return <ConfigureAccounts />
    }
}


ConfigureAccountsPage.propTypes = {
}
