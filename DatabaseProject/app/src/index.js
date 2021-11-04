import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { LocalizationProvider } from '@mui/lab';

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider>
      <Router>
        <App />
      </Router>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
