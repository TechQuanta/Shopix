import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { RecoilRoot } from "recoil";
import { ThemeProvider } from './context/ThemeContext.jsx';
import { SidebarProvider } from './context/SidebarContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <SidebarProvider >
          <App />
        </SidebarProvider>
      </ThemeProvider>
    </ RecoilRoot>
  </React.StrictMode>,
)
