import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ContextProvider } from "./context/ContextProvider";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ContextProvider>
  </React.StrictMode>
);
