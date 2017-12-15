import * as actions from "actions";
import { DEBIT, DEBT } from "constants";

const iState = {
    items: null,
    addLenderInProgress: false,
    deleteLenderInProgress: false,
    triggerLenderCreated: 0,
    triggerLenderDeleted: 0
};

export function lenders(state = iState, action) {
    switch (action.type) {
        case actions.LENDERS.SUCCESS:
            return {
                ...state,
                items: action.payload
            };

        case actions.USER_LENDERS.SUCCESS:
            return {
                ...state,
                user_lenders: action.payload
            };

        case actions.CHANGE_USER_LENDER.SUCCESS:
            return {
                ...state,
                user_lenders: action.payload
            };

        case actions.DELETE_USER_LENDER.SUCCESS:
            return {
                ...state,
                user_lenders: action.payload
            };

        case actions.ADD_LENDER.REQUEST:
            return {
                ...state,
                deleteLenderInProgress: true
            };

        case actions.ADD_LENDER.ERROR:
            return {
                ...state,
                deleteLenderInProgress: false
            };

        case actions.ADD_LENDER.SUCCESS:
            return {
                ...state,
                deleteLenderInProgress: false,
                triggerLenderCreated: state.triggerLenderCreated + 1
            };

        case actions.DELETE_LENDER.REQUEST:
            return {
                ...state,
                deleteLenderInProgress: true
            };

        case actions.DELETE_LENDER.ERROR:
            return {
                ...state,
                deleteLenderInProgress: false
            };

        case actions.DELETE_LENDER.SUCCESS:
            return {
                ...state,
                deleteLenderInProgress: false,
                triggerLenderDeleted: state.triggerLenderDeleted + 1
            };

        default:
            return state;
    }
}
