import React from 'react';
import ReactDOM from 'react-dom';

import Providers from 'providers';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'style/dist/themes/default/antd.css';
import '@ferlab/style/themes/cqdg/main.scss';

ReactDOM.render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
