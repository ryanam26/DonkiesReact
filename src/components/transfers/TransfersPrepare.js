import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
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
        let data = {}
        data.id = 'transactions'
        data.header = [
            'Date', 'Account', 'Amount', 'Roundup', 'Category', 'Description']
        data.rows = []

        for (let t of this.getTransactions()){
            let row = {}
            row.cols = []

            const roundup = t.roundup ? `$${t.roundup}` : '-'

            let dt = moment(t.transacted_at)

            row.cols.push({value: dt.format('YYYY/MM/DD'), className: 'f-500 c-cyan'})
            row.cols.push({value: t.account})
            row.cols.push({value: `$${t.amount}`, className: 'f-500 c-cyan'})
            row.cols.push({value: roundup, className: 'f-500 c-cyan'})
            row.cols.push({value: t.category})
            row.cols.push({value: t.description})
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
                <h4>{'Collected (not processed) roundup'}</h4>


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