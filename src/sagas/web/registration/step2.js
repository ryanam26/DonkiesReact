import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { REGISTRATION_STEP2_URL, apiCall } from 'services/api'


function* registrationStep2(form){
    const result = yield call(apiCall, REGISTRATION_STEP2_URL, 'POST', form, true)
    if(result.isError){
        yield put({type: actions.REGISTRATION_STEP2.ERROR, payload: result.data})
    } else {
        yield put({type: actions.REGISTRATION_STEP2.SUCCESS})
    }
}

export function* watchRegistrationStep2(){
  while(true){
    const { form } = yield take(actions.REGISTRATION_STEP2.SUBMIT)
    yield fork(registrationStep2, form)
  }
}
