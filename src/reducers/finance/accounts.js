import * as actions from 'actions'
import { DEBIT, DEBT } from 'constants'


const iState = {
    accounts: null,
    accountsNotActive: null,
    debtAccounts: null,
    debitAccounts: null,
    debtAccountsNotActive: null,
    debitAccountsNotActive: null
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

        default:
            return state
    }
}
