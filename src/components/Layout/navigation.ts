import {
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: UserIcon, current: false },
  { name: 'Chat', href: '/dashboard/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
  { name: 'Opportunities', href: '/dashboard/services', icon: BriefcaseIcon, current: false },
  { name: 'Photographers', href: '/dashboard/talents', icon: UserGroupIcon, current: false },
];
