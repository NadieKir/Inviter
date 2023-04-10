import { Navigate, Route, Routes } from 'react-router';

import {
  AdminEventsPage,
  ForbiddenPage,
  NotFoundPage,
  ProfilePage,
  SearchInvitePage,
  UserPage,
} from 'pages';
import { history, AppRouter } from 'common/router';
import { LoginLayout, MainLayout } from 'layouts';
import { AuthorizationForm, RegistrationForm } from 'forms';
import { Role } from 'models';

function App() {
  return (
    <AppRouter history={history}>
      <Routes>
        <Route index element={<Navigate replace to="/search" />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="search" element={<SearchInvitePage />} />
          <Route path="events" element={<div>events</div>} />
          <Route path="invites" element={<div>invites</div>} />
          <Route path="contacts" element={<div>contacts</div>} />
          <Route path="following" element={<div>following</div>} />
          <Route path="notifications" element={<div>notifications</div>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="user/:id" element={<UserPage />} />
        </Route>
        <Route path="/admin" element={<MainLayout variant={Role.ADMIN} />}>
          <Route path="events" element={<AdminEventsPage />} />
        </Route>
        <Route path="/" element={<LoginLayout />}>
          <Route path="login" element={<AuthorizationForm />} />
          <Route path="registration" element={<RegistrationForm />} />
        </Route>
        <Route path="forbidden" element={<ForbiddenPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </AppRouter>
  );
}

export default App;
