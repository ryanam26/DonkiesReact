import * as actions from 'actions'
import { DEBIT, DEBT } from 'constants'


const iState = {
    items: null,
    isDeleteMemberInProgress: false,
    triggerDeleteMember: 0
}


export function members(state=iState, action){
    switch(action.type){
        case actions.MEMBERS.SUCCESS:
            return {
                ...state,
                items: action.payload
            }

        case actions.DELETE_MEMBER.REQUEST:
            return {
                ...state,
                isDeleteMemberInProgress: true
            }

        case actions.DELETE_MEMBER.ERROR:
            return {
                ...state,
                isDeleteMemberInProgress: false
            }

        case actions.DELETE_MEMBER.SUCCESS:
            return {
                ...state,
                isDeleteMemberInProgress: false,
                triggerDeleteMember: state.triggerDeleteMember + 1
            }

        default:
            return state
    }
}
