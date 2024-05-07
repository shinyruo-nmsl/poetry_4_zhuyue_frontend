import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./router";
import { RoleProvider } from "./context/role";
import "./index.css";
import { HttpEventEmitter } from "./util/http";
import { navigate2Login } from "./util/navigate";

HttpEventEmitter.regist401Handler(() => {
  navigate2Login();
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RoleProvider>
      <RouterProvider router={Router.router}></RouterProvider>
    </RoleProvider>
  </React.StrictMode>
);
