/*
    This reducer processes all form errors.
    Action can arrive from front-end:
    Example: type: FORM_ERRORS, action: {formType: 'login', errors: errors}

    Action can arrive from back-end (via saga)
    Example: type: LOGIN_ERROR, action: payload (payload contains errors)

    The errors object is always has same properties:
    field1: [errors]
    field2: [errors]
    non_field_errors: [errors]
*/


import * as actions from 'actions'

const iState = {
    addLender: null,
    login: null,
    registration: null,
    changeEmail: null,
    configureAccounts: null,
    changePassword: null,
    createAccount: null,
    editProfile: null,
    editUserSettings: null,
    resetPasswordRequest: null,
    setPrimaryAccount: null
}


export function formErrors(state=iState, action){
    switch(action.type){
        case actions.FORM_ERRORS:
            if (action.formType === 'clear'){
                return iState
            } else {
                return {
                    ...iState,
                    [action.formType]: action.errors
                }
            }

        case actions.ADD_LENDER.ERROR:
            return {
                ...iState,
                addLender: action.payload
            }

        case actions.EDIT_PROFILE.ERROR:
            return {
                ...iState,
                editProfile: action.payload
            }

        case actions.EDIT_USER_SETTINGS.ERROR:
            return {
                ...iState,
                editUserSettings: action.payload
            }

        case actions.CHANGE_EMAIL.ERROR:
            return {
                ...iState,
                changeEmail: action.payload
            }

        case actions.CHANGE_PASSWORD.ERROR:
            return {
                ...iState,
                changePassword: action.payload
            }

        case actions.CREATE_ACCOUNT.ERROR:
            return {
                ...iState,
                createAccount: action.payload
            }

        case actions.ACCOUNTS_SET_ACTIVE.ERROR:
            return {
                ...iState,
                configureAccounts: action.payload
            }

        case actions.DELETE_ITEM.ERROR:
            return {
                ...iState,
                configureAccounts: action.payload
            }

        case actions.LOGIN.ERROR:
            return {
                ...iState,
                login: action.payload
            }

        case actions.REGISTRATION.ERROR:
            return {
                ...iState,
                registration: action.payload
            }

        case actions.REGISTRATION_STEP1.ERROR:
            return {
                ...iState,
                registrationStep1: action.payload
            }

        case actions.REGISTRATION_STEP2.ERROR:
            return {
                ...iState,
                registrationStep2: action.payload
            }

        case actions.REGISTRATION_STEP3.ERROR:
            return {
                ...iState,
                registrationStep3: action.payload
            }

        case actions.REGISTRATION_STEP4.ERROR:
            return {
                ...iState,
                registrationStep4: action.payload
            }

        case actions.REGISTRATION_PARENT.ERROR:
            return {
                ...iState,
                registration: action.payload
            }

        case actions.RESET_PASSWORD_REQUEST.ERROR:
            return {
                ...iState,
                resetPasswordRequest: action.payload
            }

        case actions.ACCOUNTS_SET_PRIMARY.ERROR:
            return {
                ...iState,
                setPrimaryAccount: action.payload
            }

        default:
            return state
    }
}
