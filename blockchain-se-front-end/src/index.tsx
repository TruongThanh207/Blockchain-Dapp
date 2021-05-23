import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faBook,
  faChevronLeft,
  faEnvelope,
  faListAlt,
  faQrcode,
  faUnlock,
  faUser,
  faWrench
} from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faUnlock, faQrcode, faChevronLeft, faListAlt, faEnvelope, faBook, faWrench);

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
