import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/mantine.styles"
import {RouterProvider} from "react-router-dom";
import {router} from "./features/router/router";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
