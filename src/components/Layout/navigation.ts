import {
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  UserGroupIcon,
  UserIcon,
  PresentationChartLineIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'My board', href: '/dashboard', icon: UserIcon, current: false },
  { name: 'Chat', href: '/dashboard/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
  { name: 'Gigs', href: '/dashboard/services', icon: BriefcaseIcon, current: false },
  { name: 'Talents', href: '/dashboard/talents', icon: UserGroupIcon, current: false },
];

export const navigationAdmin = [
  { name: 'Presentation', href: '/admin', icon: PresentationChartLineIcon, current: false },
  { name: 'Global', href: '/admin/global', icon: WalletIcon, current: false },
  { name: 'Fees strategies', href: '/admin/fees', icon: ShieldCheckIcon, current: false },
  { name: 'Dispute', href: '/admin/dispute', icon: ExclamationCircleIcon, current: false },
];
