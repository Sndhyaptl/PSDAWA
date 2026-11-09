import React from "react";

import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./styles/style.css";

import "./styles/responsive.css";

import "./styles/animations.css";

import App from "./App";

import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <LanguageProvider>

            <App />

        </LanguageProvider>

    </React.StrictMode>

);