import {
  BellAlertIcon,
  Cog6ToothIcon,
  StarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Your profile', href: '/dashboard/profile/edit', icon: UserCircleIcon, current: false },
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
  },
  {
    name: 'Settings',
    href: '/dashboard/profile/edit/settings',
    icon: Cog6ToothIcon,
    current: false,
  },
];
