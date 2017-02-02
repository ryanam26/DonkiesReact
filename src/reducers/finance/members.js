import * as actions from 'actions'
import { DEBIT, DEBT } from 'constants'


const iState = {
    items: null
}


export function members(state=iState, action){
    switch(action.type){
        case actions.MEMBERS.SUCCESS:
            return {
                ...state,
                items: action.payload
            }

        default:
            return state
    }
}
