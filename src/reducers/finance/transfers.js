 import * as actions from 'actions'

const iState = {
    transfersPrepare: null,
    transfersDonkies: null,
    transfersDebt: null,
    transfersStripe: null
}


export function transfers(state=iState, action){
    switch(action.type){
        case actions.TRANSFERS_DONKIES.SUCCESS:
            return {
                ...state,
                transfersDonkies: action.payload
            }

        case actions.TRANSFERS_DEBT.SUCCESS:
            return {
                ...state,
                transfersDebt: action.payload
            }

        case actions.TRANSFERS_PREPARE.SUCCESS:
            return {
                ...state,
                transfersPrepare: action.payload
            }

        case actions.TRANSFERS_STRIPE.SUCCESS:
            return {
                ...state,
                transfersStripe: action.payload
            }

        default:
            return state
    }
}
