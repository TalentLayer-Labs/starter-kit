import {
  BellAlertIcon,
  Cog6ToothIcon,
  StarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export const navigation = () => {
  const config = [
    {
      name: 'Your profile',
      href: '/profiles/edit',
      icon: UserCircleIcon,
      current: false,
      completitonKey: 'userDetails',
    },
    {
      name: 'Trust Score',
      href: '/profiles/edit/trust-score',
      icon: StarIcon,
      current: false,
    },
    {
      name: 'Notifications',
      href: '/profiles/edit/privacy',
      icon: BellAlertIcon,
      current: false,
      completitonKey: 'web3mail',
    },
    {
      name: 'Settings',
      href: '/profiles/edit/settings',
      icon: Cog6ToothIcon,
      current: false,
    },
  ];

  if (process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL == 'false') {
    config.splice(2, 1);
  }

  return config;
};
