import { createContext, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';

import userStore, { UserStore } from 'stores/UserStore';

export const UserContext = createContext<UserStore>(userStore);

export const UserProvider = observer(({ children }: PropsWithChildren) => {
  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
});
