import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'

import {
    accountsSetActive,
    apiGetRequest,
    deleteMember,
    growlAddRequest,
    setFormErrors } from 'actions'

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
            activeMemberId: null
        }
    }
    
    componentWillReceiveProps(nextProps){
        if (this.props.triggerDeleteMember !== nextProps.triggerDeleteMember){
            this.props.apiGetRequest('accounts')
            this.props.apiGetRequest('items')
            this.props.apiGetRequest('transactions')    

            this.props.growlAddRequest({
                message: 'Financial institution deleted',
                type: 'success'
            })
            this.setState({activeMemberId: null})
        }
    }

    onClickRemoveMember(){
        this.clearErrors()
        const { activeMemberId } = this.state
        if (!activeMemberId){
            return
        }
        const member = this.getMemberById(activeMemberId)
        this.props.deleteMember(member.identifier)
    }

    /**
     * If account is active, set not active and vice versa.
     */
    onClickAccountSetActive(id){
        this.clearErrors()
        let account = this.getAccountById(id)
        let isActive = !account.is_active
        const form = {is_active: isActive}
        this.props.accountsSetActive(id, form)
    }

    /**
     * Callback function, passed to SelectSimple
     */
    onSelectMember(value){
        this.clearErrors()
        if (value !== ''){
            this.setState({activeMemberId: parseInt(value)})
        } else {
            this.setState({activeMemberId: null})
        }
    }

    getMemberById(id){
        const { members } = this.props
        for (let m of members){
            if (m.id === id){
                return m
            }
        }
        return null
    }

    clearErrors(){
        this.props.setFormErrors('clear', null)
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
        const {
            accounts,
            accountsNotActive,
            deleteMemberInProgress,
            members } = this.props
        
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
                        <div className="col-xs-6">
                            {deleteMemberInProgress ?
                                <LoadingInline />
                            :
                                <button
                                    onClick={this.onClickRemoveMember}
                                    className="btn bgm-red btn-icon-text btn-sm waves-effect m-t-5">
                                        <i className="zmdi zmdi-delete" />
                                    {'Remove financial institution'}
                                </button>}
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
    deleteMember: PropTypes.func,
    errors: PropTypes.object,
    growlAddRequest: PropTypes.func,
    deleteMemberInProgress: PropTypes.bool,
    members: PropTypes.array,
    setFormErrors: PropTypes.func,
    triggerDeleteMember: PropTypes.number
}

const mapStateToProps = (state) => ({
    accounts: state.accounts.accounts,
    accountsNotActive: state.accounts.accountsNotActive,
    errors: state.formErrors.configureAccounts,
    deleteMemberInProgress: state.members.deleteMemberInProgress,
    members: state.members.items,
    triggerDeleteMember: state.members.triggerDeleteMember 
})

export default connect(mapStateToProps, {
    accountsSetActive,
    apiGetRequest,
    growlAddRequest,
    deleteMember,
    setFormErrors
})(ConfigureAccounts)