import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import moment from 'moment'
import { apiGetRequest } from 'actions'
import { LoadingInline, TableData } from 'components'


class TransfersPrepare extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    componentWillMount(){
        this.props.apiGetRequest('transfers_prepare')   
    }

    getData(){
        const { transfers } = this.props

        let data = {}
        data.id = 'transfersPrepare'
        data.header = ['Date', 'Account', 'Roundup']
        data.rows = []

        for (let t of transfers){
            let row = {}
            row.cols = []

            let dt = moment(t.created_at)

            row.cols.push({value: dt.format('YYYY/MM/DD'), className: 'f-500 c-cyan'})
            row.cols.push({value: t.account})
            row.cols.push({value: `$${t.roundup}`, className: 'f-500 c-cyan'})
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
                <h4>{'History of collected roundup'}</h4>
                <TableData
                    data={this.getData()}
                    searchFields={['account']} />
            </wrap>
        )
    }
}


TransfersPrepare.propTypes = {
    apiGetRequest: PropTypes.func,
    transfers: PropTypes.array
}

const mapStateToProps = (state) => ({
    transfers: state.transfers.transfersPrepare
})

export default connect(mapStateToProps, {
    apiGetRequest
})(TransfersPrepare)