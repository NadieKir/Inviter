import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import 'style/index.scss';
import { UserProvider } from 'common/contexts/UserProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
);
