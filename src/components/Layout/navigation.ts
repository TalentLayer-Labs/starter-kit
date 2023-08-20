import {
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  DeviceTabletIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'My board', href: '/dashboard', icon: UserIcon, current: false },
  { name: 'Chat', href: '/dashboard/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
  { name: 'Gigs', href: '/dashboard/services', icon: BriefcaseIcon, current: false },
  { name: 'Talents', href: '/dashboard/talents', icon: UserGroupIcon, current: false },
  {
    name: 'Gig Board',
    href: '/dashboard/gig-board-create',
    icon: DeviceTabletIcon,
    current: false,
  },
];
