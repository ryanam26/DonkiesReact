import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import rootReducer from "~Scripts/reducers";

export const API_ROOT_URL = "https://api.donkies.co/";
export const HOME_PAGE_URL = "https://donkies.co/";
export const DWOLLA_MODE = "prod";

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}
