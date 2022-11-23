import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers';

let store = createStore(allReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <React.StrictMode>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider >
);

