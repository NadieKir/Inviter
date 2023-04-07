import { Navigate, Route, Routes } from 'react-router';

import {
  ForbiddenPage,
  Layout,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  SearchInvitePage,
  UserPage,
} from 'pages';
import { history, AppRouter } from 'common/router';

function App() {
  return (
    <AppRouter history={history}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate replace to="/search" />} />
          <Route path="search" element={<SearchInvitePage />} />
          <Route path="events" element={<div>events</div>} />
          <Route path="invites" element={<div>invites</div>} />
          <Route path="contacts" element={<div>contacts</div>} />
          <Route path="following" element={<div>following</div>} />
          <Route path="notifications" element={<div>notifications</div>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="forbidden" element={<ForbiddenPage />} />
          <Route path="not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </AppRouter>
  );
}

export default App;
