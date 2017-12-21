import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import Routers from "~Scripts/routes";
import configureStore from "~Scripts/store/configureStore";
import rootSaga from "~Scripts/sagas";

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById("root")
);
