import * as actions from 'actions'
import { DEBIT, DEBT } from 'constants'


const iState = {
    items: null,
    deleteItemInProgress: false,
    createItemInProgress: false,
    triggerItemCreated: 0,
    triggerItemDeleted: 0
}


export function items(state=iState, action){
    switch(action.type){
        case actions.ITEMS.SUCCESS:
            return {
                ...state,
                items: action.payload
            }

        case actions.CREATE_ITEM.REQUEST:
            return {
                ...state,
                createItemInProgress: true
            }

        case actions.CREATE_ITEM.ERROR:
            return {
                ...state,
                createItemInProgress: false
            }

        case actions.CREATE_ITEM.SUCCESS:
            return {
                ...state,
                createItemInProgress: false,
                triggerItemCreated: state.triggerItemCreated + 1
            }

        case actions.DELETE_ITEM.REQUEST:
            return {
                ...state,
                deleteItemInProgress: true
            }

        case actions.DELETE_ITEM.ERROR:
            return {
                ...state,
                deleteItemInProgress: false
            }

        case actions.DELETE_ITEM.SUCCESS:
            return {
                ...state,
                deleteItemInProgress: false,
                triggerItemDeleted: state.triggerItemDeleted + 1
            }

        default:
            return state
    }
}
