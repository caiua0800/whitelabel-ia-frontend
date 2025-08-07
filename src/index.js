import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ChatProvider from "./Context/ChatContext";
import AuthProvider from "./Context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import LoadingProvider from "./Context/LoadingContext";
import ProductProvider from "./Context/ProductContext";
import SaleProvider from "./Context/SaleContext";
import SystemMessageProvider from "./Context/SystemMessageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SystemMessageProvider>
        <LoadingProvider>
          <AuthProvider>
            <SaleProvider>
              <ProductProvider>
                <ChatProvider>
                  <App />
                </ChatProvider>
              </ProductProvider>
            </SaleProvider>
          </AuthProvider>
        </LoadingProvider>
      </SystemMessageProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
