import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { REGISTRATION_STEP1_URL, apiCall } from 'services/api'


function* registrationStep1(form){
    const result = yield call(apiCall, REGISTRATION_STEP1_URL, 'POST', form)
    if(result.isError){
        yield put({type: actions.REGISTRATION_STEP1.ERROR, payload: result.data})
    } else {
        yield put({type: actions.REGISTRATION_STEP1.SUCCESS, payload: result.data})
    }
}

export function* watchRegistrationStep1(){
  while(true){
    const { form } = yield take(actions.REGISTRATION_STEP1.SUBMIT)
    yield fork(registrationStep1, form)
  }
}
