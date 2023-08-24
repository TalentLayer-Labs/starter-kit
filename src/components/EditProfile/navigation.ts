import {
  Cog6ToothIcon,
  LockClosedIcon,
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
    name: 'Privacy',
    href: '/dashboard/profile/edit/privacy',
    icon: LockClosedIcon,
    current: false,
  },
  {
    name: 'Settings',
    href: '/dashboard/profile/edit/settings',
    icon: Cog6ToothIcon,
    current: false,
  },
];
