import * as actions from 'actions'
import { DEBIT, DEBT } from 'constants'


const iState = {
    accounts: null,
    accountsNotActive: null,
    debtAccounts: null,
    debitAccounts: null,
    debtAccountsNotActive: null,
    debitAccountsNotActive: null,
    setAccountNumberInProgress: false,
    createAccountInProgress: false,
    triggerAccountCreated: 0,
    triggerSetAccountNumber: 0
}


export function accounts(state=iState, action){
    switch(action.type){
        // case actions.ACCOUNTS.REQUEST:
        //     return {
        //         ...state
        //     }

        case actions.ACCOUNTS.SUCCESS:
            let debtAccounts = []
            let debitAccounts = []
            let debtAccountsNotActive = []
            let debitAccountsNotActive = []

            for (let obj of action.payload){
                if (obj.type_ds === DEBT && obj.is_active === true){
                    debtAccounts.push(obj)    
                } 

                if (obj.type_ds === DEBIT && obj.is_active === true){
                    debitAccounts.push(obj)    
                }

                if (obj.type_ds === DEBT && obj.is_active === false){
                    debtAccountsNotActive.push(obj)    
                } 

                if (obj.type_ds === DEBIT && obj.is_active === false){
                    debitAccountsNotActive.push(obj)    
                } 
            }

            let accounts = action.payload.filter(
                obj => obj.is_active === true)
            
            let accountsNotActive = action.payload.filter(
                obj => obj.is_active === false)

            return {
                ...state,
                accounts: accounts,
                accountsNotActive: accountsNotActive,
                debtAccounts: debtAccounts,
                debitAccounts: debitAccounts,
                debtAccountsNotActive: debtAccountsNotActive,
                debitAccountsNotActive: debitAccountsNotActive
            }

        case actions.ACCOUNTS_SET_NUMBER.REQUEST:
            return {
                ...state,
                setAccountNumberInProgress: true
            }

        case actions.ACCOUNTS_SET_NUMBER.SUCCESS:
            return {
                ...state,
                setAccountNumberInProgress: false,
                triggerSetAccountNumber: state.triggerSetAccountNumber + 1
            }

        case actions.CREATE_ACCOUNT.REQUEST:
            return {
                ...state,
                createAccountInProgress: true
            }

        case actions.CREATE_ACCOUNT.SUCCESS:
            return {
                ...state,
                createAccountInProgress: false,
                triggerAccountCreated: state.triggerAccountCreated + 1
            }

        case actions.CREATE_ACCOUNT.ERROR:
            return {
                ...state,
                createAccountInProgress: false
            }

        default:
            return state
    }
}
