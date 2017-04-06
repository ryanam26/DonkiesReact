import * as actions from 'actions'
import { DEBIT, DEBT } from 'constants'


const iState = {
    debtInstitutions: null,
}


export function institutions(state=iState, action){
    switch(action.type){
        case actions.DEBT_INSTITUTIONS.SUCCESS:
            return {
                ...state,
                debtInstitutions: action.payload
            }


        default:
            return state
    }
}
