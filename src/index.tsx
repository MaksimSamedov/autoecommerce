import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {getSlug, useRoute} from "./config/routes";
import {setupContext} from "./app/Context";

console.log(window.location.href);
const shopSlug = getSlug();
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

if (!shopSlug) {
    root.render(
        <h1>No shop selected</h1>
    );
} else {
    setupContext({shopSlug})
        .then((context) => {
            try {
                root.render(
                    <BrowserRouter>
                        <React.StrictMode>
                            <App/>
                        </React.StrictMode>
                    </BrowserRouter>
                );
            } catch (e) {
                root.render(
                    <h1>Unexpected error</h1>
                );
            }

        })
        .catch(err => {
            console.error(err)
            root.render(
                <h1>Shop not found</h1>
            );
        })
}




