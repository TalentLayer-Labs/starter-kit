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
  { name: 'dashboard', href: '/dashboard', icon: HomeIcon, current: false },
  { name: 'my place', href: '/', icon: BriefcaseIcon, current: false },
  { name: 'new post', href: '/work/create', icon: PlusCircleIcon, current: false },
  { name: 'chat', href: '/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
];

export const hirerAdminNavigation = [
  { name: 'hirer profile', href: '/admin/hirer-profile', icon: UserIcon, current: false },
  {
    name: 'configure your place',
    href: '/admin/configure-place',
    icon: WrenchIcon,
    current: false,
  },
  {
    name: 'embed your place',
    href: '/admin/embed-place',
    icon: CodeBracketSquareIcon,
    current: false,
  },
];

export const workerNavigation = [
  { name: 'dashboard', href: '/dashboard', icon: HomeIcon, current: false },
  { name: 'missions', href: '/', icon: BriefcaseIcon, current: false },
  { name: 'profile', href: '/profiles/edit', icon: UserIcon, current: false },
  { name: 'chat', href: '/messaging', icon: ChatBubbleBottomCenterIcon, current: false },
];

export const PlatformAdminNavigation = [
  {
    name: 'presentation',
    href: `/superadmin/presentation`,
    icon: PresentationChartLineIcon,
    current: false,
  },
  {
    name: 'fees strategies',
    href: `/superadmin/fees`,
    icon: ShieldCheckIcon,
    current: false,
  },
  {
    name: 'dispute',
    href: `/superadmin/dispute`,
    icon: ExclamationCircleIcon,
    current: false,
  },
  {
    name: 'web3Mail',
    href: `/superadmin/web3mail`,
    icon: EnvelopeIcon,
    current: false,
  },
];
