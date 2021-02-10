import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import reducers from "./reducers";
import ruRU from 'antd/lib/locale-provider/ru_RU';
import App from './app';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import mySaga from "./saga/saga";

const sagaMiddleware = createSagaMiddleware(mySaga);

const store = createStore( reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <ConfigProvider locale={ruRU}>
    <BrowserRouter>
        <Provider store = { store }>
          <App />
        </Provider> 
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
