import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuthProvider } from './helpers/auth';
import rootReducer from './reducers/rootReducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer);

root.render(
  <React.StrictMode>
     <Provider store={store}>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
      </Provider>
  </React.StrictMode>
);

