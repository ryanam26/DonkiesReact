import React from 'react'
import { Route, IndexRoute } from 'react-router'

import {
    AccountsPage,
    AddBankPage,
    AddLenderPage,
    ConfigureAccountsPage,
    CreateFundingSourcePage,
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    LoginFacebookPage,
    NotFoundPage,
    RegistrationPage,
    RegistrationConfirmPage,
    SettingsPage,
    TestPage,
    TransactionsPage,
    TransfersPage,
    UserNotConfirmedPage,
    UserProfilePage } from 'pages'


import App from 'containers/App'
import { requireAuth } from 'components/Auth'


export default (
    <div>
        <Route component={LoginPage} path="/login" />
        <Route component={LoginFacebookPage} path="/login_facebook" />     
        <Route component={RegistrationPage} path="/registration" />
        <Route component={RegistrationConfirmPage} path="/confirm" />
        <Route component={ForgotPasswordPage} path="/forgot_password" />     
       
        <Route component={requireAuth(UserNotConfirmedPage)} path="/not_confirmed" />

        <Route component={requireAuth(App)} path="/">
            <IndexRoute component={HomePage} />
            <Route component={AccountsPage} path="/accounts" />
            <Route component={AddBankPage} path="/add_bank" />
            <Route component={AddLenderPage} path="/add_lender" />
            <Route component={ConfigureAccountsPage} path="/configure_accounts" />
            <Route component={CreateFundingSourcePage} path="/create_funding_source" />
            <Route component={SettingsPage} path="/settings" />
            <Route component={TestPage} path="/test_page" />
            <Route component={TransactionsPage} path="/transactions" />
            <Route component={TransfersPage} path="/transfers" />
            <Route component={UserProfilePage} path="/user_profile" />
        </Route>

        <Route component={NotFoundPage} path="*" /> 
    </div>
)
