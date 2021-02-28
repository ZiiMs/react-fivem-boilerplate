
import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector as useReduxSelector, Provider } from 'react-redux';
import { createStore } from 'redux';

import App from 'containers/App';
import rootReducer from "./Reducers";
import { EventListener } from "./Nui"

export const store = createStore(rootReducer, {});

export const useSelector =  useReduxSelector


ReactDOM.render(
  <Provider store={store}>
      <App />
      <EventListener/>
  </Provider>,
  document.getElementById('app'),
);
