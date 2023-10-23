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
  CodeBracketSquareIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

export const hirerNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
  { name: 'My post', href: '/dashboard/work', icon: BriefcaseIcon, current: false },
  { name: 'New post', href: '/dashboard/work/create', icon: PlusCircleIcon, current: false },
  { name: 'My talents', href: '/dashboard/talents', icon: UserGroupIcon, current: false },
  { name: 'Chat', href: '/dashboard/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
];

export const hirerAdminNavigation = [
  { name: 'Hirer profile', href: '/admin/hirer-profile', icon: UserIcon, current: false },
  {
    name: 'Configure your place',
    href: '/admin/configure-place',
    icon: WrenchIcon,
    current: false,
  },
  {
    name: 'Embed your place',
    href: '/admin/embed-place',
    icon: CodeBracketSquareIcon,
    current: false,
  },
];

export const workerNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
  { name: 'Find work', href: '/dashboard/work', icon: BriefcaseIcon, current: false },
  { name: 'My profile', href: '/dashboard/profile/edit', icon: UserIcon, current: false },
  { name: 'Chat', href: '/dashboard/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
];

export const PlatformAdminNavigation = [
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
