import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { END } from "redux-saga";
import rootReducer from "~Scripts/reducers";

// export const API_ROOT_URL = 'https://api.donkies.co/'
export const API_ROOT_URL = "http://localhost:8000/";
export const HOME_PAGE_URL = "http://localhost:8000/";
export const DWOLLA_MODE = "sandbox";

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(sagaMiddleware, createLogger()))
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}
