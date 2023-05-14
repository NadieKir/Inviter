import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { InvitesDetailsModalProvider, NotificationsProvider, UserProvider } from 'common/contexts';

import 'style/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <UserProvider>
    <NotificationsProvider>
      <InvitesDetailsModalProvider>
        <App />
      </InvitesDetailsModalProvider>
    </NotificationsProvider>
  </UserProvider>
);
