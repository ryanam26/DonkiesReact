import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { REGISTRATION_STEP4_URL, apiCall } from 'services/api'


function* registrationStep4(form){
    const result = yield call(apiCall, REGISTRATION_STEP4_URL, 'POST', form, true)
    if(result.isError){
        yield put({type: actions.REGISTRATION_STEP4.ERROR, payload: result.data})
    } else {
        yield put({type: actions.REGISTRATION_STEP4.SUCCESS})
    }
}

export function* watchRegistrationStep4(){
  while(true){
    const { form } = yield take(actions.REGISTRATION_STEP4.SUBMIT)
    yield fork(registrationStep4, form)
  }
}
