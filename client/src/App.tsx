import { Navigate, Route, Routes } from "react-router";

import { ForbiddenPage, Layout, LoginPage, NotFoundPage } from "pages";
import { history, AppRouter } from "common/router";

function App() {
  return (
    <AppRouter history={history}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate replace to="/search" />} />
          <Route path="search" element={<div>search</div>} />
          <Route path="a" element={<div>a</div>} />
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
