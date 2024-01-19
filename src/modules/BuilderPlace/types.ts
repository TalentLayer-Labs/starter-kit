import { EntityStatus, User, WorkType } from '.prisma/client';

export interface iBuilderPlacePalette {
  primary: string;
  primaryFocus: string;
  primaryContent: string;
  base100: string;
  base200: string;
  base300: string;
  baseContent: string;
  info: string;
  infoContent: string;
  success: string;
  successContent: string;
  warning: string;
  warningContent: string;
  error: string;
  errorContent: string;
}
export interface UpdateBuilderPlace {
  builderPlaceId: string;
  subdomain?: string;
  name?: string;
  icon?: string;
  presentation?: string;
  preferredWorkTypes?: WorkType[];
  baseline?: string;
  about?: string;
  aboutTech?: string;
  palette?: iBuilderPlacePalette;
  owners?: string[];
  logo?: string;
  cover?: string;
  profilePicture?: string;
  signature: `0x${string}` | Uint8Array;
}
export interface ValidateBuilderPlaceAndOwner {
  builderPlaceId: string;
  ownerId: string;
  subdomain: string;
  owners?: string[];
  baseline?: string;
  about?: string;
  aboutTech?: string;
  palette?: iBuilderPlacePalette;
  logo?: string;
  cover?: string;
  profilePicture?: string;
  signature: `0x${string}` | Uint8Array;
}
export interface DeleteBuilderPlace {
  id: string;
  signature: `0x${string}` | Uint8Array;
}

export interface UpdateBuilderPlaceDomain {
  id: string;
  subdomain: string;
  customDomain: string;
  signature: `0x${string}` | Uint8Array;
}

export interface AddBuilderPlaceCollaborator {
  ownerId: string;
  builderPlaceId: string;
  newCollaboratorAddress: string;
  signature: `0x${string}` | Uint8Array;
}

export interface RemoveBuilderPlaceCollaborator {
  ownerId: string;
  builderPlaceId: string;
  collaboratorAddress: string;
  signature: `0x${string}` | Uint8Array;
}

export interface SetBuilderPlaceOwner {
  id: string;
  ownerId: string;
}

export interface RemoveBuilderPlaceOwner {
  id: number;
  ownerId: number;
}

export interface RemoveUserAddress {
  id: number;
  userAddress: string;
}

export interface SetUserProfileOwner {
  id: string;
  userAddress: string;
  talentLayerId: string;
}

export interface SetBuilderPlaceAndHirerOwner {
  builderPlaceId: string;
  hirerId: string;
  ownerAddress: string;
  ownerTalentLayerId: string;
}

export interface VerifyEmail {
  userId: string;
}

export interface UpdateUserEmail {
  userId: string;
  email: string;
  userAddress: string;
  name: string;
  domain: string;
  signature: `0x${string}` | Uint8Array;
}

export interface VerifyAccount {
  userId: string;
  signature: `0x${string}` | Uint8Array;
}

export interface VerifyEmailProps {
  userId: string;
}

export interface SendVerificationEmail {
  to: string;
  userId: string;
  name: string;
  domain: string;
}

export enum DomainVerificationStatusProps {
  Valid = 'Valid Configuration',
  Invalid = 'Invalid Configuration',
  Pending = 'Pending Verification',
  NotFound = 'Domain Not Found',
  Error = 'Unknown Error',
}

export interface CreateBuilderPlaceAction {
  name: string;
  palette: iBuilderPlacePalette;
  about: string;
  preferredWorkTypes: WorkType[];
  profilePicture?: string;
}

export interface CreateWorkerProfileAction {
  email: string;
  name: string;
  picture?: string;
  about?: string;
  skills?: string;
}

export interface CreateHirerProfileAction {
  email: string;
  name: string;
  picture?: string;
  about?: string;
  status?: string;
  talentLayerId?: string;
}

export interface UpdateHirerProfileAction {
  id: number;
  email: string;
  name?: string;
  picture?: string;
  about?: string;
  status?: string;
  talentLayerId?: string;
}

export interface UpdateWorkerProfileAction {
  id: number;
  email: string;
  name?: string;
  picture?: string;
  about?: string;
  status?: string;
  skills?: string;
  talentLayerId?: string;
}

export interface UpdateUserEmailAction {
  id: number;
  email: string;
}

export interface CreateBuilderPlaceProps {
  name: string;
  palette: iBuilderPlacePalette;
  about: string;
  preferredWorkTypes: WorkType[];
  profilePicture?: string;
}

export interface CreateWorkerProfileProps {
  email: string;
  name: string;
  picture?: string;
  about?: string;
  skills?: string;
}
export interface CreateHirerProfileProps {
  email: string;
  name: string;
  picture?: string;
  about?: string;
  status?: string;
}

export type IBuilderPlace = {
  id: string;
  about?: string;
  aboutTech?: string;
  baseline?: string;
  cover?: string;
  customDomain?: string | null;
  icon?: string;
  logo?: string;
  name: string;
  owner: User;
  collaborators?: User[];
  palette?: iBuilderPlacePalette;
  preferredWorkTypes: WorkType[];
  presentation?: string;
  profilePicture?: string;
  status: EntityStatus;
  ownerId?: string;
  // ownerAddress?: string;
  // ownerTalentLayerId?: string;
  subdomain?: string;
};

export interface IUserProfile {
  id: string;
  about?: string;
  address?: string;
  counterStartDate: number;
  email: string;
  isEmailVerified: boolean;
  name: string;
  picture?: string;
  status: EntityStatus;
  talentLayerId?: string;
  weeklyTransactionCounter: number;
}

export interface IWorkerProfile extends IUserProfile {
  skills?: string[];
}

export interface IHirerProfile extends IUserProfile {}

// From https://vercel.com/docs/rest-api/endpoints#get-a-project-domain
export interface DomainResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

// From https://vercel.com/docs/rest-api/endpoints#get-a-domain-s-configuration
export interface DomainConfigResponse {
  /** How we see the domain's configuration. - `CNAME`: Domain has a CNAME pointing to Vercel. - `A`: Domain's A record is resolving to Vercel. - `http`: Domain is resolving to Vercel but may be behind a Proxy. - `null`: Domain is not resolving to Vercel. */
  configuredBy?: ('CNAME' | 'A' | 'http') | null;
  /** Which challenge types the domain can use for issuing certs. */
  acceptedChallenges?: ('dns-01' | 'http-01')[];
  /** Whether or not the domain is configured AND we can automatically generate a TLS certificate. */
  misconfigured: boolean;
}

// From https://vercel.com/docs/rest-api/endpoints#verify-project-domain
export interface DomainVerificationResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export interface OrganizationProps {
  name: string;
  about: string;
  jobType: WorkType;
  imageUrl: string;
}

export enum ImageType {
  PNG = 'image/png',
  SVG = 'image/svg+xml',
  JPG = 'image/jpeg',
}
