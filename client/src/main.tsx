import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/inter'; 
import '@fontsource/roboto-mono';  
import '@fontsource/poppins'; 
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>

   
    <App />
    </Provider>
  </React.StrictMode>,
)
