import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './Store/UserStore';
import ServiceStore from './Store/ServiceStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null);

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      service: new ServiceStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);