import { PreferredWorkTypes } from '../../types';
import { Document } from 'mongoose';

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
  _id: string;
  subdomain: string;
  name: string;
  baseline?: string;
  about?: string;
  aboutTech?: string;
  palette?: iBuilderPlacePalette;
  ownerTalentLayerId: string | undefined;
  owners: string[] | undefined;
  status: string | undefined;
  logo?: string;
  cover?: string;
  profilePicture?: string;
  signature: `0x${string}` | Uint8Array;
}
export interface DeleteBuilderPlace {
  _id: string;
  signature: `0x${string}` | Uint8Array;
}

export interface UpdateBuilderPlaceDomain {
  _id: string;
  subdomain: string;
  customDomain: string;
  signature: `0x${string}` | Uint8Array;
}

export interface AddBuilderPlaceCollaborator {
  ownerId: string;
  builderPlaceId: string;
  newCollaborator: string;
  signature: `0x${string}` | Uint8Array;
}

export interface RemoveBuilderPlaceCollaborator {
  ownerId: string;
  builderPlaceId: string;
  newCollaborator: string;
  signature: `0x${string}` | Uint8Array;
}

export interface SetBuilderPlaceOwner {
  id: string;
  owners: string[];
  ownerTalentLayerId: string;
}

export interface SetWorkerProfileOwner {
  id: string;
  talentLayerId: string;
}

export interface VerifyEmail {
  email: string;
  userId: string;
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
  preferredWorkTypes: PreferredWorkTypes[];
  profilePicture?: string;
}

export interface CreateWorkerProfileAction {
  email: string;
  name: string;
  image_url?: string;
  about?: string;
  skills?: string;
  status?: string;
  talentLayerId?: string;
}

export interface CreateBuilderPlaceProps {
  name: string;
  palette: iBuilderPlacePalette;
  about: string;
  preferredWorkTypes: PreferredWorkTypes[];
  profilePicture?: string;
}

export interface CreateWorkerProfileProps {
  email: string;
  name: string;
  image_url?: string;
  about?: string;
  skills?: string;
  status?: string;
  talentLayerId?: string;
}

export type IBuilderPlace = {
  _id: string;
  name: string;
  subdomain?: string;
  customDomain?: string | null;
  logo?: string;
  icon?: string;
  cover?: string;
  profilePicture?: string;
  palette?: iBuilderPlacePalette;
  about?: string;
  aboutTech?: string;
  baseline?: string;
  owners?: string[];
  ownerTalentLayerId?: string;
  status: 'Validated' | 'Pending';
  preferredWorkTypes: PreferredWorkTypes[];
};

export type IWorkerProfile = {
  _id: string;
  email: string;
  emailVerified: boolean;
  status: 'validated' | 'pending';
  talentLayerId?: string;
  name: string;
  picture?: string;
  about?: string;
  skills?: string[];
  weeklyTransactionCounter: number;
  counterStartDate: number;
};

export interface IWorkerMongooseSchema extends Document {
  _id: string;
  email: string;
  emailVerified: boolean;
  status: 'Validated' | 'Pending';
  talentLayerId?: string;
  name: string;
  picture?: string;
  about?: string;
  skills?: string[];
  weeklyTransactionCounter: number;
  counterStartDate: number;
}

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
  jobType: PreferredWorkTypes;
  imageUrl: string;
}

export enum ImageType {
  PNG = 'image/png',
  SVG = 'image/svg+xml',
  JPG = 'image/jpeg',
}
