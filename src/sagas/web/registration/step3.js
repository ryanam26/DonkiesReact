import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { REGISTRATION_STEP3_URL, apiCall } from 'services/api'


function* registrationStep3(form){
    const result = yield call(apiCall, REGISTRATION_STEP3_URL, 'POST', form, true)
    if(result.isError){
        yield put({type: actions.REGISTRATION_STEP3.ERROR, payload: result.data})
    } else {
        yield put({type: actions.REGISTRATION_STEP3.SUCCESS})
    }
}

export function* watchRegistrationStep3(){
  while(true){
    const { form } = yield take(actions.REGISTRATION_STEP3.SUBMIT)
    yield fork(registrationStep3, form)
  }
}
