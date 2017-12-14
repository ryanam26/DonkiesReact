import React from "react";
import { Route, IndexRoute } from "react-router";

import {
  AccountsPage,
  AddBankPage,
  AddDebtAccountPage,
  AddLenderPage,
  ConfigureAccountsPage,
  CreateFundingSourcePage,
  HomePage,
  LoanCalculatorPage,
  LoginPage,
  LoginFacebookPage,
  NotFoundPage,
  RegistrationPage,
  RegistrationConfirmPage,
  ResetPasswordPage,
  ResetPasswordRequestPage,
  SettingsPage,
  TestPage,
  TransactionsPage,
  TransfersPage,
  UserNotConfirmedPage,
  FAQPage,
  RegistrationStep1,
  RegistrationStep2,
  RegistrationStep3,
  RegistrationStep4,
  UserProfilePage,
  RegistrationParentPage,
  DownLoadAppPage
} from "pages";

import App from "containers/App";
import { requireAuth } from "components/Auth";
import { requireActiveAccount } from "components/ActiveAccount";
import { requirePrimaryAccount } from "components/PrimaryAccount";
import { requireSignupCompleted } from "components/SignupCompleted";
import { requireSignupStepsCompleted } from "components/SignupStepsCompleted";

export default (
  <div>
    <Route component={LoginPage} path="/login" />
    <Route component={LoginFacebookPage} path="/login_facebook" />
    <Route component={RegistrationParentPage} path="/registration_parent" />
    <Route component={RegistrationStep1} path="/registration" />
    <Route component={requireAuth(RegistrationStep2)} path="/registration/2" />
    <Route component={requireAuth(RegistrationStep3)} path="/registration/3" />
    <Route component={requireAuth(RegistrationStep4)} path="/registration/4" />
    <Route component={RegistrationConfirmPage} path="/confirm" />
    <Route component={ResetPasswordRequestPage} path="/forgot_password" />
    <Route component={ResetPasswordPage} path="/reset" />

    <Route
      component={requireAuth(UserNotConfirmedPage)}
      path="/not_confirmed"
    />
    <Route component={requireAuth(DownLoadAppPage)} path="/download_app" />
    <Route
      component={requireAuth(
        requireSignupStepsCompleted(
          requireActiveAccount(requirePrimaryAccount(App))
        )
      )}
      path="/"
    >
      <IndexRoute component={HomePage} />
      <Route component={AccountsPage} path="/accounts" />
      <Route component={FAQPage} path="/faq" />
      <Route component={AddBankPage} path="/add_bank" />
      <Route component={AddLenderPage} path="/add_lender" />
      <Route component={ConfigureAccountsPage} path="/configure_accounts" />
      <Route
        component={CreateFundingSourcePage}
        path="/create_funding_source"
      />
      <Route component={LoanCalculatorPage} path="/loan_calculator" />
      <Route component={SettingsPage} path="/settings" />
      <Route component={TestPage} path="/test_page" />
      <Route component={TransactionsPage} path="/transactions" />
      <Route component={UserProfilePage} path="/user_profile" />
    </Route>

    <Route component={NotFoundPage} path="*" />
  </div>
);

// Functionality for debt accounts
// <Route component={AddDebtAccountPage} path="/add_debt_account" />
