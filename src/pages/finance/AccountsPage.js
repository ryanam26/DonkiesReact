import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Link } from 'react-router'
import { DebitAccounts, Lenders } from 'components'



export default class AccountsPage extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        return (
            <div className="row">
                <div className="col-sm-6">
                    <DebitAccounts />
                </div>

                <div className="col-sm-6">
                    <Lenders />
                </div>
            </div>

        )
    }
}


AccountsPage.propTypes = {
}
