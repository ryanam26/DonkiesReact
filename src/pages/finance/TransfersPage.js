import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Link } from 'react-router'
import { TransfersDonkies, TransfersPrepare, TransfersDebt } from 'components'



export default class TransfersPage extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        const { location } = this.props

        return (
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <TransfersPrepare />
                </div>

                <div className="col-sm-12 col-md-6">
                    <TransfersDonkies />
                </div>

                <div className="col-sm-12 col-md-6">
                    <TransfersDebt />
                </div>
            </div>
        )
    }
}


TransfersPage.propTypes = {
    location: PropTypes.object
}
