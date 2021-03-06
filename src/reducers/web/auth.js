 import * as actions from 'actions'

const iState = {
    token: null,
    isAuthenticated: false,
    registrationSuccessMessage: null
}


export function auth(state=iState, action){
    switch(action.type){
        case actions.TOKEN.GET:
            let token = window.localStorage.getItem('token')
            if (token === null){
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false
                }
            }

            return {
                ...state,
                token: token,
                isAuthenticated: true
            }

        case actions.LOGIN.SUCCESS:
            window.localStorage.setItem('token', action.payload)
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true
            }

        case actions.LOGIN.ERROR:
            return {
                ...state,
                token: null,
                isAuthenticated: false
            }

        case actions.REGISTRATION.SUCCESS:
            const message = `
                You have successfully registered on the site and welcome email
                has been sent to you!
                Please follow the link in the email to confirm your registration.`
            return {
                ...state,
                registrationSuccessMessage: message
            }

        case actions.REGISTRATION.ERROR:
            return {
                ...state,
                registrationSuccessMessage: null
            }

        case actions.REGISTRATION_STEP1.SUCCESS:
            window.localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true
            }

        case actions.REGISTRATION_STEP2.SUCCESS:
            return {
                ...state,
                step2: true
            }

        case actions.REGISTRATION_STEP3.SUCCESS:
            return {
                ...state,
                step3: true
            }

        case actions.REGISTRATION_STEP4.SUCCESS:
            return {
                ...state,
                step4: true
            }

        case actions.REGISTRATION_PARENT.SUCCESS:
            return {
                ...state,
                registrationSuccessMessage: 'You have successfully registered'
            }

        case actions.REGISTRATION_PARENT.ERROR:
            return {
                ...state,
                registrationSuccessMessage: null
            }

        case actions.LOGOUT:
            window.localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false
            }

        // Send from apiCall
        case actions.TOKEN_EXPIRED:
            window.localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false
            }

        default:
            return state
    }
}
