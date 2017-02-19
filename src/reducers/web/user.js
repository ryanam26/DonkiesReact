import * as actions from 'actions'

const iState = {
    item: null,
    isSubmittingChangeEmail: false,
    isSubmittingChangePassword: false,
    isSubmittingEditProfile: false,
    isSubmittingEditUserSettings: false,
    triggerChangeEmail: 0,
    triggerChangePassword: 0,
    triggerEditProfile: 0,
    triggerEditUserSettings: 0,
    triggerResetPasswordRequest: 0
}

export function user(state=iState, action){
    switch(action.type){
        case actions.USER.SUCCESS:
            return {
                ...state,
                item: action.payload
            }

        case actions.CHANGE_EMAIL.REQUEST:
            return {
                ...state,
                isSubmittingChangeEmail: true
            }

        case actions.CHANGE_EMAIL.ERROR:
            return {
                ...state,
                isSubmittingChangeEmail: false
            }

        case actions.CHANGE_EMAIL.SUCCESS:
            return {
                ...state,
                triggerChangeEmail: state.triggerChangeEmail + 1,
                isSubmittingChangeEmail: false
            }

        case actions.CHANGE_PASSWORD.REQUEST:
            return {
                ...state,
                isSubmittingChangePassword: true
            }

        case actions.CHANGE_PASSWORD.ERROR:
            return {
                ...state,
                isSubmittingChangePassword: false
            }

        case actions.CHANGE_PASSWORD.SUCCESS:
            return {
                ...state,
                triggerChangePassword: state.triggerChangePassword + 1,
                isSubmittingChangePassword: false
            }

        case actions.EDIT_PROFILE.REQUEST:
            return {
                ...state,
                isSubmittingEditProfile: true
            }

        case actions.EDIT_PROFILE.ERROR:
            return {
                ...state,
                isSubmittingEditProfile: false
            }

        case actions.EDIT_PROFILE.SUCCESS:
            return {
                ...state,
                triggerEditProfile: state.triggerEditProfile + 1,
                isSubmittingEditProfile: false
            }

        case actions.EDIT_USER_SETTINGS.REQUEST:
            return {
                ...state,
                isSubmittingEditUserSettings: true
            }

        case actions.EDIT_USER_SETTINGS.ERROR:
            return {
                ...state,
                isSubmittingEditUserSettings: false
            }

        case actions.EDIT_USER_SETTINGS.SUCCESS:
            return {
                ...state,
                triggerEditUserSettings: state.triggerEditUserSettings + 1,
                isSubmittingEditUserSettings: false
            }

        case actions.RESET_PASSWORD_REQUEST.SUCCESS:
            return {
                ...state,
                triggerResetPasswordRequest: state.triggerResetPasswordRequest + 1
            }

        default:
            return state
    }
}
