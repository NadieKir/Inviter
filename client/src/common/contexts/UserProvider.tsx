import { createContext, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';

import userStore, { CurrentUserStore } from 'stores/CurrentUserStore';

export const UserContext = createContext<CurrentUserStore>(userStore);

export const UserProvider = observer(({ children }: PropsWithChildren) => {
  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
});
