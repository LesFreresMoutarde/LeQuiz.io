import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import Util from "./util/Util";

Util.initializeTokensStorage();

ReactDOM.render(
    // <React.StrictMode> ITS COMMENTED BECAUSE IT RENDERS COMPONENT TWICE WHICH IS FATAL FOR SOCKET HANDLING
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
