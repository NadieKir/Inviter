import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { BrowserHistory } from 'history';

interface AppRouterProps {
  history: BrowserHistory;
}

export const AppRouter = ({
  history,
  children,
  ...props
}: PropsWithChildren<AppRouterProps>) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};
