import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import moment from 'moment'
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

    getData(){
        const { transfers } = this.props

        let data = {}
        data.id = 'transfersUser'
        data.header = ['Created', 'Account', 'Amount', 'Is processed']
        data.rows = []

        for (let t of transfers){
            let row = {}
            row.cols = []

            let dt = moment(t.created_at)

            let isProcessed
            if (t.is_processed){
                isProcessed = <i className="zmdi zmdi-check" />
            } else {
                isProcessed = <i className="zmdi zmdi-minus" />
            }

            row.cols.push({value: dt.format('YYYY/MM/DD'), className: 'f-500 c-cyan'})
            row.cols.push({value: t.account})
            row.cols.push({value: `$${t.amount}`, className: 'f-500 c-cyan'})
            row.cols.push({value: isProcessed})
            data.rows.push(row)
        }
        return data
    }


    render(){
        const { transfers } = this.props
        
        if (!transfers){
            return <LoadingInline />
        }

        return (
            <wrap>
                <h4>{'Transfers to Donkies'}</h4>
                <TableData
                    data={this.getData()}
                    searchFields={['account']} />
            </wrap>
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