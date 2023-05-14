import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Route, Routes } from 'react-router';

import { PrivateRoute, UserStatus, inviteTabs } from 'components';
import { AuthorizationForm, RegistrationForm } from 'forms';
import {
  AdminEventsPage,
  AdminProfilePage,
  ContactsPage,
  ErrorFallback,
  EventPage,
  FollowingsPage,
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
import { Role } from 'models';

function App() {
  return (
    <AppRouter history={history}>
      <Routes>
        <Route index element={<Navigate replace to="/search" />} />
        <Route
          path="/"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <PrivateRoute roles={[Role.USER]}>
                <MainLayout />
              </PrivateRoute>
            </ErrorBoundary>
          }
        >
          <Route path="search" element={<SearchInvitePage />} />
          <Route path="events" element={<SearchEventPage />} />
          <Route path="events/:id" element={<EventPage />} />
          <Route path="invites" element={<InvitesPage />}>
            <Route
              index
              element={<Navigate replace to={inviteTabs[0].link} />}
            />
            {inviteTabs.map((t, i) => (
              <Route
                index={i === 0}
                key={t.link}
                path={t.link}
                element={t.component}
              />
            ))}
          </Route>
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="following" element={<FollowingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="user/:login" element={<UserPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <PrivateRoute roles={[Role.ADMIN]}>
                <MainLayout variant={Role.ADMIN} />
              </PrivateRoute>
            </ErrorBoundary>
          }
        >
          <Route path="profile" element={<AdminProfilePage />} />
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
