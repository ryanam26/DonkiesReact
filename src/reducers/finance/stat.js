 import * as actions from 'actions'

const iState = null

export function stat(state=iState, action){
    switch(action.type){
        case actions.STAT.SUCCESS:
            return action.payload

        default:
            return state
    }
}
