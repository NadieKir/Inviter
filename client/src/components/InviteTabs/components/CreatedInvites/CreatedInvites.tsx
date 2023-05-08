import { observer } from 'mobx-react-lite';

import { mockedInvites } from 'models';

import { CreatedInviteCard } from './components/CreatedInviteCard/CreatedInviteCard';

import styles from './CreatedInvites.module.scss';

export const CreatedInvites = observer(() => {
  return (
    <ul className={styles.createdInvites}>
      {mockedInvites.map((i) => (
        <CreatedInviteCard invite={i} />
      ))}
    </ul>
  );
});
