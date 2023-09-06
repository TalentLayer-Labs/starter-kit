import {
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  UserGroupIcon,
  UserIcon,
  PresentationChartLineIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'My board', href: '/dashboard', icon: UserIcon, current: false },
  { name: 'Chat', href: '/dashboard/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
  { name: 'Gigs', href: '/dashboard/services', icon: BriefcaseIcon, current: false },
  { name: 'Talents', href: '/dashboard/talents', icon: UserGroupIcon, current: false },
];

export const navigationAdmin = [
  {
    name: 'Presentation',
    href: `/admin/presentation/${process.env.NEXT_PUBLIC_PLATFORM_ID}`,
    icon: PresentationChartLineIcon,
    current: false,
  },
  {
    name: 'Fees strategies',
    href: `/admin/fees/${process.env.NEXT_PUBLIC_PLATFORM_ID}`,
    icon: ShieldCheckIcon,
    current: false,
  },
  {
    name: 'Dispute',
    href: `/admin/dispute/${process.env.NEXT_PUBLIC_PLATFORM_ID}`,
    icon: ExclamationCircleIcon,
    current: false,
  },
];
