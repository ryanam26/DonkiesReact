import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Link } from 'react-router'
import { getDollarAmount } from 'services/helpers'
import { apiGetRequest, deleteLender, navigate } from 'actions'
import { CardSimple, TableSimple } from 'components'


class Lenders extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    componentWillMount(){
        this.props.apiGetRequest('lenders')
    }

    onClickDelete(id){
        this.props.deleteLender(id)
    }

    /**
     * Prepare data for table.
     */
    getData(lenders){
        let data = {}
        data.id = 'debtAccounts'
        data.header = [
            'LENDER',
            'LINK',
            ''
        ]
        data.rows = []

        for (let lender of lenders){
            let row = {}
            row.cols = []

            let deleteButton = <i style={{fontSize: '20px', cursor: 'pointer'}} className="zmdi zmdi-delete" onClick={this.onClickDelete.bind(null, lender.id)} />                    
            
            let href = <a target="_blank" href={lender.link}>{lender.link}</a>

            row.cols.push({value: lender.name})
            row.cols.push({value: href})
            row.cols.push({value: deleteButton})
            data.rows.push(row)
        }
        return data
    }

    hasLenders(){
        const { lenders } = this.props
        if (lenders && lenders.length > 0){
            return true
        }
        return false
    }

    render(){
        const { lenders, user } = this.props
       
        return (
            <wrap>
                <CardSimple
                    header="Pay your debt now"
                    headerClass="m-b-20"
                    isContentToBody={false}>
                                    
                    <Link to="/add_lender" className="btn bgm-lightblue btn-icon-text btn-sm waves-effect m-r-5 m-t-5">
                        <i className="zmdi zmdi-plus" />
                        {'Add lender'}
                    </Link>
                   
                </CardSimple>

                {this.hasLenders() && <TableSimple data={this.getData(lenders)} />}
            </wrap>
        )
    }
}


Lenders.propTypes = {
    apiGetRequest: PropTypes.func,
    deleteLender: PropTypes.func,
    lenders: PropTypes.array,
    navigate: PropTypes.func,
    triggerCreated: PropTypes.number,
    triggerDeleted: PropTypes.number,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    lenders: state.lenders.items,
    triggerCreated: state.lenders.triggerLenderCreated,
    triggerDeleted: state.lenders.triggerLenderDeleted,
    user: state.user.item
})

export default connect(mapStateToProps, {
    apiGetRequest,
    deleteLender,
    navigate
})(Lenders)