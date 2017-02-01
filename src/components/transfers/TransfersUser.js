import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { apiGetRequest } from 'actions'
import { LoadingInline, TableData } from 'components'


class TransfersUser extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    componentWillMount(){
        this.props.apiGetRequest('transfers_user')   
    }

    render(){
        const { transfers } = this.props
        
        if (!transfers){
            return <LoadingInline />
        }

        return (
            <div>{'TransfersUser'}</div>
        )
    }
}


TransfersUser.propTypes = {
    apiGetRequest: PropTypes.func,
    transfers: PropTypes.array
}

const mapStateToProps = (state) => ({
    transfers: state.transfers.transfersUser
})

export default connect(mapStateToProps, {
    apiGetRequest
})(TransfersUser)