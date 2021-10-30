import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import "antd/dist/antd.css";
import {Provider} from "react-redux";
import store from "./state/store";

ReactDOM.render(
    <BrowserRouter>
        {/*Every React Component has Access to the Store*/}
        {/*A Store is a single State of Truth for Data*/}
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
