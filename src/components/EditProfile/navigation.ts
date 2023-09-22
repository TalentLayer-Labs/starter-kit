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
      href: '/dashboard/profile/edit',
      icon: UserCircleIcon,
      current: false,
      completitonKey: 'userDetails',
    },
    {
      name: 'Trust Score',
      href: '/dashboard/profile/edit/trust-score',
      icon: StarIcon,
      current: false,
    },
    {
      name: 'Notifications',
      href: '/dashboard/profile/edit/privacy',
      icon: BellAlertIcon,
      current: false,
      completitonKey: 'web3mail',
    },
    {
      name: 'Settings',
      href: '/dashboard/profile/edit/settings',
      icon: Cog6ToothIcon,
      current: false,
    },
  ];

  if (process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL == 'false') {
    config.splice(2, 1);
  }

  return config;
};
