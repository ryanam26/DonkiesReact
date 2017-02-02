import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { accountsSetActive, apiGetRequest, growlAddRequest } from 'actions'
import { createUUID } from 'services/helpers'
import { 
    ErrorBlock,
    LoadingInline,
    SelectSimple,
    TableSimple } from 'components'

import { DEBIT, DEBT } from 'constants'


class ConfigureAccounts extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            activeMemberId: null,
            isLoading: false
        }
    }
    
    onClickRemoveMember(){
        const { activeMemberId } = this.state
        if (!activeMemberId){
            return
        }
        this.submitRequest(activeMemberId)
    }

    /**
     * If account is active, set not active and vice versa.
     */
    onClickAccountSetActive(id){
        let account = this.getAccountById(id)
        let isActive = !account.is_active
        const form = {is_active: isActive}
        this.props.accountsSetActive(id, form)
    }

    /**
     * Callback function, passed to SelectSimple
     */
    onSelectMember(value){
        if (value !== ''){
            this.setState({activeMemberId: parseInt(value)})
        } else {
            this.setState({activeMemberId: null})
        }
    }

    getAccountById(id){
        const { accounts, accountsNotActive } = this.props
        for (let a of accounts){
            if (a.id === id){
                return a
            }
        }

        for (let a of accountsNotActive){
            if (a.id === id){
                return a
            }
        }
        return null
    }

    /**
     * Options for SelectSimple for members
     */
    getMembersOptions(){
        const { members } = this.props

        let data = []
        data.push({value: '', text: '--- Select financial institution'})
        
        for (let m of members){
            data.push({value: m.id, text: m.name})
        }
        return data
    }

    

    /**
     * Api request to remove member.
     */
    async submitRequest(activeMemberId){
        this.setState({isLoading: true})

        const url = `${MEMBERS_URL}/${activeMemberId}`

        let response = await apiCall5(url, true) 

        this.setState({isLoading: false})

        if (response.status === 204){
            // Update Redux state
            this.props.apiGetRequest('accounts')
            this.props.apiGetRequest('members')
            this.props.apiGetRequest('transactions')
        } else {
            const id = createUUID()
            this.props.growlAddRequest({
                id: id,
                message: 'Error',
                'type': 'danger'
            })
        }
    }

    renderAccounts(){
        const { accounts, errors } = this.props
        const { activeMemberId } = this.state
        if (!activeMemberId || accounts.length === 0){
            return null
        }

        let data = {}

        data.id = 'accounts'
        data.header = ['ACCOUNT', 'TYPE', '']
        data.rows = []

        console.log('!!!!!!!!!!!!1')
        console.log(activeMemberId)
        console.log(accounts.filter(a => a.member.id === activeMemberId))

        for (let a of accounts.filter(a => a.member.id === activeMemberId)){
            let row = {}
            row.cols = []
            
            let btn = <i onClick={this.onClickAccountSetActive.bind(null, a.id)} style={{fontSize: '20px', cursor: 'pointer'}} className="zmdi zmdi-delete" title="deactivate" />

            row.cols.push({value: a.name})
            row.cols.push({value: a.type})
            row.cols.push({value: btn})
            data.rows.push(row)
        }
        return (
            <wrap>
                <h4 className="m-t-20">{'Active accounts'}</h4>
                <ErrorBlock errors={errors} />
                <TableSimple data={data} />
            </wrap>
        )
    }

    renderAccountsNotActive(){
        const { accountsNotActive, errors } = this.props
        const { activeMemberId } = this.state
        if (!activeMemberId || accountsNotActive.length === 0){
            return null
        }

        let data = {}

        data.id = 'accountsNotActive'
        data.header = ['ACCOUNT', 'TYPE', '']
        data.rows = []

        for (let a of accountsNotActive.filter(a => a.member.id === activeMemberId)){
            let row = {}
            row.cols = []
            
            let btn = <i onClick={this.onClickAccountSetActive.bind(null, a.id)} style={{fontSize: '20px', cursor: 'pointer'}} className="zmdi zmdi-assignment" title="activate" />

            row.cols.push({value: a.name})
            row.cols.push({value: a.type})
            row.cols.push({value: btn})
            data.rows.push(row)
        }

        if (data.rows.length === 0){
            return null
        }

        return (
            <wrap>
                <h4 className="m-t-20">{'Non-active accounts'}</h4>
                <ErrorBlock errors={errors} />
                <TableSimple data={data} />
            </wrap>
        )   
    }

    render(){
        const { activeMemberId, isLoading } = this.state
        const { accounts, accountsNotActive, members } = this.props
        
        if (isLoading || !members || !accounts || !accountsNotActive){
            return <LoadingInline />
        }

        return (
            <div className="card p-30">
                <h2>{'Configure accounts'}</h2>

                
                <div className="row">
                    <div className="col-xs-6">
                        
                        <SelectSimple
                            name="account"
                            onChange={this.onSelectMember}
                            options={this.getMembersOptions()} />
                    </div>

                    {activeMemberId &&
                        <div className="col-sm-6">
                            <button
                                onClick={this.onClickRemoveMember}
                                className="btn bgm-red btn-icon-text btn-sm waves-effect m-t-5">
                                    <i className="zmdi zmdi-delete" />
                                {'Remove financial institution'}
                            </button>
                        </div>
                    }
                </div>

                

                <div className="row">
                    <div className="col-sm-6">
                        {this.renderAccounts()}
                    </div>

                    <div className="col-sm-6">
                        {this.renderAccountsNotActive()}        
                    </div>
                </div>
            </div>
        )
    }
}


ConfigureAccounts.propTypes = {
    accounts: PropTypes.array,
    accountsNotActive: PropTypes.array,
    accountsSetActive: PropTypes.func,
    apiGetRequest: PropTypes.func,
    errors: PropTypes.object,
    growlAddRequest: PropTypes.func,
    members: PropTypes.array
}

const mapStateToProps = (state) => ({
    accounts: state.accounts.accounts,
    accountsNotActive: state.accounts.accountsNotActive,
    errors: state.formErrors.configureAccounts,
    members: state.members.items,
})

export default connect(mapStateToProps, {
    accountsSetActive,
    apiGetRequest,
    growlAddRequest
})(ConfigureAccounts)