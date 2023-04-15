import calendar from 'assets/images/navbarIcons/calendar.svg';
// import bell from 'assets/images/calendar.svg';
// import follower from 'assets/images/calendar.svg';
// import people from 'assets/images/calendar.svg';
// import search from 'assets/images/calendar.svg';
// import ticket from 'assets/images/calendar.svg';
import bell from 'assets/images/navbarIcons/bell.svg';
import follower from 'assets/images/navbarIcons/follower.svg';
import people from 'assets/images/navbarIcons/people.svg';
import search from 'assets/images/navbarIcons/search.svg';
import ticket from 'assets/images/navbarIcons/ticket.svg';

type LinkToNavItem = {
  name: string;
  link: string;
  icon: string;
};

export const userLinksToNavItem: LinkToNavItem[] = [
  {
    name: 'Поиск инвайта',
    link: '/search',
    icon: search,
  },
  {
    name: 'События',
    link: '/events',
    icon: calendar,
  },
  {
    name: 'Мои инвайты',
    link: '/invites',
    icon: ticket,
  },
  {
    name: 'Контакты',
    link: '/contacts',
    icon: people,
  },
  {
    name: 'Подписки',
    link: '/following',
    icon: follower,
  },
  {
    name: 'Уведомления',
    link: '/notifications',
    icon: bell,
  },
];

export const adminLinksToNavItem: LinkToNavItem[] = [
  {
    name: 'Отчёты',
    link: '/admin/reports',
    icon: search,
  },
  {
    name: 'События',
    link: '/admin/events',
    icon: calendar,
  },
  {
    name: 'Инвайты',
    link: '/admin/invites',
    icon: ticket,
  },
  {
    name: 'Пользователи',
    link: '/admin/users',
    icon: people,
  },
];