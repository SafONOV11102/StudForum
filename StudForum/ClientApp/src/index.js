import 'bootstrap/dist/css/bootstrap.css';
import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import UserStore from './stores/UserStore';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

export const Context = createContext(null);

root.render(
  <Context.Provider value={{
    user : new UserStore(null)
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
  );


serviceWorkerRegistration.unregister();


reportWebVitals();
