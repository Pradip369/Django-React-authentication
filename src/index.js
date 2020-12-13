import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './Authcomponent/Auth.css'

ReactDOM.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
);

reportWebVitals();
