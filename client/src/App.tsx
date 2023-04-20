import { Navigate, Route, Routes } from 'react-router';

import {
  AdminEventsPage,
  ForbiddenPage,
  InvitesPage,
  NotFoundPage,
  ProfilePage,
  SearchEventPage,
  SearchInvitePage,
  UserPage,
} from 'pages';
import { history, AppRouter } from 'common/router';
import { LoginLayout, MainLayout } from 'layouts';
import { AuthorizationForm, RegistrationForm } from 'forms';
import { Role } from 'models';
import { PrivateRoute, UserStatus, inviteTabs } from 'components';

function App() {
  return (
    <AppRouter history={history}>
      <Routes>
        <Route index element={<Navigate replace to="/search" />} />
        <Route
          path="/"
          element={
            <PrivateRoute roles={[UserStatus.AUTHORIZED]}>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="search" element={<SearchInvitePage />} />
          <Route path="events" element={<SearchEventPage />} />
          <Route path="invites" element={<InvitesPage />}>
            {inviteTabs.map((t, i) => (
              <>
                {i === 0 && (
                  <Route index element={<Navigate replace to={t.link} />} />
                )}
                <Route
                  index={i === 0}
                  key={t.link}
                  path={t.link}
                  element={t.component}
                />
              </>
            ))}
          </Route>
          <Route path="contacts" element={<div>contacts</div>} />
          <Route path="following" element={<div>following</div>} />
          <Route path="notifications" element={<div>notifications</div>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="user/:id" element={<UserPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={[Role.ADMIN]}>
              <MainLayout variant={Role.ADMIN} />
            </PrivateRoute>
          }
        >
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
