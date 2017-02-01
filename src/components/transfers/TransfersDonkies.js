import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { apiGetRequest } from 'actions'
import { LoadingInline, TableData } from 'components'


class TransfersDonkies extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    componentWillMount(){
        this.props.apiGetRequest('transfers_donkies')   
    }

    render(){
        const { transfers } = this.props
        
        if (!transfers){
            return <LoadingInline />
        }

        return (
            <div>{'TransfersDonkies'}</div>
        )
    }
}


TransfersDonkies.propTypes = {
    apiGetRequest: PropTypes.func,
    transfers: PropTypes.array
}

const mapStateToProps = (state) => ({
    transfers: state.transfers.transfersDonkies
})

export default connect(mapStateToProps, {
    apiGetRequest
})(TransfersDonkies)