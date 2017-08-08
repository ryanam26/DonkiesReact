import { take, put, call, fork, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { history } from 'services'
import * as actions from 'actions'
import * as api from 'services/api'

import { watchCreateAccount } from './finance/accounts'
import { watchSetActive } from './finance/accounts'
import { watchSetAccountNumber } from './finance/accounts'
import { watchSetPrimaryAccount } from './finance/accounts'
import { watchCreateItem } from './finance/items'
import { watchDeleteItem } from './finance/items'
import { watchAddLender } from './finance/lenders'
import { watchDeleteLender } from './finance/lenders'

import { watchApiGetRequest } from './web/apiGetRequest'
import { watchApiEditRequest } from './web/apiEditRequest'
import { watchRegistration } from './web/registration'
import { watchLogin } from './web/login'
import { watchLogout } from './web/logout'
import { watchLoginFacebook } from './web/loginFacebook'

import { watchGrowlAdd } from './web/growl'

import { watchChangeEmail } from './web/user'
import { watchChangePassword } from './web/user'
import { watchCloseDonkiesAccount } from './web/user'
import { watchEditProfile } from './web/user'
import { watchEditSettings } from './web/user'
import { watchResetPasswordRequest } from './web/user'


function* watchNavigate(){
  while(true){
    const { pathname } = yield take(actions.NAVIGATE)
    yield history.push(pathname)
  }
}


export default function* root() {
  yield [
    fork(watchApiGetRequest),
    fork(watchApiEditRequest),
    fork(watchAddLender),
    fork(watchDeleteLender),
    fork(watchChangeEmail),
    fork(watchChangePassword),
    fork(watchCloseDonkiesAccount),
    fork(watchCreateAccount),
    fork(watchCreateItem),
    fork(watchDeleteItem),
    fork(watchEditProfile),
    fork(watchEditSettings),
    fork(watchGrowlAdd),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoginFacebook),
    fork(watchNavigate),
    fork(watchRegistration),
    fork(watchResetPasswordRequest),
    fork(watchSetActive),
    fork(watchSetAccountNumber),
    fork(watchSetPrimaryAccount)
  ]
}

