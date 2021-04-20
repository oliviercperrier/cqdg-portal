import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Button, Result } from 'antd';

import Providers from 'providers';

import App from './App';
import reportWebVitals from './reportWebVitals';

import '@ferlab/style/themes/cqdg/font.scss';
import 'style/themes/default/main.scss';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
    <Result
        extra={
            <Button onClick={resetErrorBoundary} type="primary">
                Reload
            </Button>
        }
        status="500"
        subTitle={error.message}
        title="Error"
    />
);

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Providers>
                <App />
            </Providers>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
