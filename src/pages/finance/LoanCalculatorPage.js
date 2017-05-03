import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Link } from 'react-router'
import { LoanCalculator } from 'components'



export default class LoanCalculatorPage extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        return (
            <div className="row">
                <div className="col-sm-12">
                    <LoanCalculator />             
                </div>
            </div>

        )
    }
}


LoanCalculatorPage.propTypes = {
}
