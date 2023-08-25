import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {
  NotificationsProvider,
  UserProvider,
} from 'common/contexts';

import 'style/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <UserProvider>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </UserProvider>,
);
