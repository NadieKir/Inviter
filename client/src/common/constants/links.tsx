import {
  ClosedInvites,
  CreatedInvites,
  UserResponses,
} from 'components/InviteTabs/components';
import { InviteTabDescriptor } from 'components/InviteTabs/types';

export const inviteLinks = {
  current: '/invites/current',
  closed: '/invites/closed',
  responses: '/invites/responses',
};

export const inviteTabs: InviteTabDescriptor[] = [
  {
    label: 'Созданные',
    link: 'created',
    component: <CreatedInvites />,
  },
  {
    label: 'Отклики',
    link: 'responses',
    component: <UserResponses />,
  },
  {
    label: 'Утвержденные',
    link: 'closed',
    component: <ClosedInvites />,
  },
  {
    label: 'Прошедшие',
    link: 'past',
    component: <ClosedInvites />,
  },
];
