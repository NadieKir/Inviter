import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { UserProvider } from 'common/contexts';

import 'style/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
