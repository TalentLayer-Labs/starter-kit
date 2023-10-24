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
  { name: 'My posts', href: '/', icon: BriefcaseIcon, current: false },
  { name: 'New post', href: '/work/create', icon: PlusCircleIcon, current: false },
  { name: 'Find worker', href: '/profiles', icon: UserGroupIcon, current: false },
  { name: 'Chat', href: '/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
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
  { name: 'Find work', href: '/', icon: BriefcaseIcon, current: false },
  { name: 'My profile', href: '/profiles/edit', icon: UserIcon, current: false },
  { name: 'Chat', href: '/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
];

export const PlatformAdminNavigation = [
  {
    name: 'Presentation',
    href: `/superadmin/presentation`,
    icon: PresentationChartLineIcon,
    current: false,
  },
  {
    name: 'Fees strategies',
    href: `/superadmin/fees`,
    icon: ShieldCheckIcon,
    current: false,
  },
  {
    name: 'Dispute',
    href: `/superadmin/dispute`,
    icon: ExclamationCircleIcon,
    current: false,
  },
  {
    name: 'Web3Mail',
    href: `/superadmin/web3mail`,
    icon: EnvelopeIcon,
    current: false,
  },
];
