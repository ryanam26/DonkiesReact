import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Link } from 'react-router'
import { TransfersDonkies, TransfersPrepare, TransfersUser } from 'components'



export default class TransfersPage extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        const { location } = this.props

        return (
            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <TransfersPrepare />
                </div>

                <div className="col-sm-6 col-md-4">
                    <TransfersDonkies />
                </div>

                <div className="col-sm-6 col-md-4">
                    <TransfersUser />
                </div>
            </div>
        )
    }
}


TransfersPage.propTypes = {
    location: PropTypes.object
}
