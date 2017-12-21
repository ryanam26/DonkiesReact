import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "~Scripts/history";

import App from "~Scripts/containers/App";

import LoginPage from "~Scripts/pages/Login";
import LoginFacebookPage from "~Scripts/pages/Login/Facebook";
import RegistrationParentPage from "~Scripts/pages/Registration/Parent";
import RegistrationStep1 from "~Scripts/pages/Registration/Step1";
import RegistrationStep2 from "~Scripts/pages/Registration/Step2";
import RegistrationConfirmPage from "~Scripts/pages/Registration/Confirm";
import TermsPage from "~Scripts/pages/Terms";
import ResetPasswordRequestPage from "~Scripts/pages/PasswordReset";
import ResetPasswordPage from "~Scripts/pages/PasswordReset/Confirm";
import UserNotConfirmedPage from "~Scripts/pages/NotConfirmed";
import DownLoadAppPage from "~Scripts/pages/DownloadApp";
import NotFoundPage from "~Scripts/pages/NotFound";

export default () => (
  <Router history={history}>
    <Switch>
      <Route component={LoginPage} path="/login" />
      <Route component={LoginFacebookPage} path="/login_facebook" />
      <Route component={RegistrationParentPage} path="/registration_parent" />
      <Route component={RegistrationStep1} path="/registration" />
      <Route component={RegistrationStep2} path="/registration/2" />
      <Route component={RegistrationConfirmPage} path="/confirm" />
      <Route component={TermsPage} path="/terms" />
      <Route component={ResetPasswordRequestPage} path="/forgot_password" />
      <Route component={ResetPasswordPage} path="/reset" />
      <Route component={UserNotConfirmedPage} path="/not_confirmed" />
      <Route component={DownLoadAppPage} path="/download_app" />
      <Route component={NotFoundPage} path="/404" />
      <Route component={App} path="/" />
    </Switch>
  </Router>
);
