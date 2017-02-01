 import * as actions from 'actions'

const iState = {
    transfersPrepare: null,
    transfersDonkies: null,
    transfersUser: null
}


export function transfers(state=iState, action){
    switch(action.type){
        case actions.TRANSFERS_DONKIES.SUCCESS:
            return {
                ...state,
                transfersDonkies: action.payload
            }

        case actions.TRANSFERS_PREPARE.SUCCESS:
            return {
                ...state,
                transfersPrepare: action.payload
            }

        case actions.TRANSFERS_USER.SUCCESS:
            return {
                ...state,
                transfersUser: action.payload
            }

        default:
            return state
    }
}
