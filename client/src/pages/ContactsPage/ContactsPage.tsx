import { useContext } from 'react';

import { UserContext } from 'common/contexts';
import { Loader } from 'components';

import styles from './ContactsPage.module.scss';

export const ContactsPage = () => {
  const { user, isLoading, error } = useContext(UserContext);

  if (isLoading) return <Loader />;
  if (!user) throw error;

  return <div>ContactsPage</div>;
};
