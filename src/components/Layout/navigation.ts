import {
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  UserGroupIcon,
  UserIcon,
  PresentationChartLineIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  PlusCircleIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: UserIcon, current: false },
  { name: 'My post', href: '/dashboard/services', icon: BriefcaseIcon, current: false },
  { name: 'New post', href: '/dashboard/services/create', icon: PlusCircleIcon, current: false },
  { name: 'Chat', href: '/dashboard/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
  { name: 'My talents', href: '/dashboard/talents', icon: UserGroupIcon, current: false },
  { name: 'Admin', href: '/admin', icon: WrenchIcon, current: false },
];

export const navigationAdmin = [
  {
    name: 'Presentation',
    href: `/admin/presentation`,
    icon: PresentationChartLineIcon,
    current: false,
  },
  {
    name: 'Fees strategies',
    href: `/admin/fees`,
    icon: ShieldCheckIcon,
    current: false,
  },
  {
    name: 'Dispute',
    href: `/admin/dispute`,
    icon: ExclamationCircleIcon,
    current: false,
  },
  {
    name: 'Web3Mail',
    href: `/admin/web3mail`,
    icon: EnvelopeIcon,
    current: false,
  },
];
