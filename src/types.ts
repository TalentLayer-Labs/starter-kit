import { Connector } from 'wagmi';

export type IHive = {
  id: string;
  handle: string;
  address: string;
  description?: IHiveDetails;
  members: string[];
  honeyFee: number;
  owner: string;
  ownerIdentity?: IUser;
  identity: IUser;
  paymasterAddress: string;
};

export type IHiveDetails = {
  manifesto: string;
  offeredServices: string;
};

export type IUser = {
  id: string;
  handle: string;
  address: string;
  rating: string;
  description?: IUserDetails;
  userStats: IUserStats;
  delegates?: string[];
  isAdmin?: boolean;
};

export type IUserDetails = {
  title: string;
  name: string;
  role?: string;
  imageUrl?: string;
  videoUrl?: string;
  about?: string;
  skills_raw?: string;
  web3mailPreferences?: IWeb3mailPreferences;
};

export type IWeb3mailPreferences = {
  activeOnNewService: boolean;
  activeOnNewProposal: boolean;
  activeOnProposalValidated: boolean;
  activeOnFundRelease: boolean;
  activeOnReview: boolean;
  activeOnPlatformMarketing: boolean;
};

export type IUserStats = {
  numReceivedReviews: number;
  numGivenReviews?: number;
  numCreatedServices?: number;
  numFinishedServicesAsBuyer?: number;
  numCreatedProposals?: number;
  numFinishedServicesAsSeller?: number;
};

export type IAccount = {
  address?: `0x${string}`;
  connector?: Connector;
  isConnecting: boolean;
  isReconnecting: boolean;
  isConnected: boolean;
  isDisconnected: boolean;
  status: 'connecting' | 'reconnecting' | 'connected' | 'disconnected';
};

// TODO: add the rest of the fields
export type ITransaction = {
  id: string;
};

export type IService = {
  id: string;
  status: ServiceStatusEnum;
  buyer: IUser;
  seller: IUser;
  sender: IUser;
  recipient: IUser;
  cid: string;
  createdAt: string;
  updatedAt: string;
  transaction: ITransaction;
  platform: IPlatform;
  proposals: IProposal[];
  validatedProposal: IProposal[];
  description?: IServiceDetails;
};

export type IFeeType = {
  platform: IPlatform;
  OriginPlatform: IPlatform;
};

export type IFeePayment = {
  id: string; // autogenerated id
  createdAt: string; // timestamp of block creation
  platform: IPlatform; // platform entity
  service: IService; // service entity
  type: IFeeType; // fee type
  token: IToken; // token entity
  amount: string; // platform fee
};

export type IFeeClaim = {
  id: string; // autogenerated id
  createdAt: string; // timestamp of block creation
  platform: IPlatform; // platform entity
  token: IToken; // token entity
  amount: string; // claim amount
  transactionHash: string; // Transaction hash of the transfer
};

export type IPlatform = {
  id: string; // platform id
  address: `0x${string}`; // wallet address of platform owner
  name: string; // name of the platform
  createdAt: string;
  updatedAt: string;
  feePayments: IFeePayment[]; // Platform-related fee payments
  totalPlatformGains: IPlatformGain; // Platform-related total gains per token
  feeClaims: IFeeClaim[]; // Platform-related fee claims
  originServiceFeeRate: number; // Fee asked by the platform which created the service
  originValidatedProposalFeeRate: number; // Fee asked by the platform on which the proposal was validated
  servicePostingFee: string; // Flat fee asked by the platform to post a service
  proposalPostingFee: string; // Flat fee asked by the platform to post a proposal
  arbitrator: `0x${string}`; // address of the arbitrator contract
  arbitratorExtraData: `0x${string}`; // extra data for the arbitrator
  arbitrationFeeTimeout: string; // timeout for the arbitration fee to be paid
  cid: string; //cid of description
  description: IPlatformDescription;
  signer: `0x${string}`; // address of the platform signer
};

export type IPlatformDescription = {
  id: string; // cid
  name: string; // Not implement yet on 06.09.23
  about: string; // text
  website: string; // url
  platform: IPlatform;
  videoUrl: string;
  imageUrl: string;
};

export type IPlatformGain = {
  id: string;
  platform: IPlatform;
  token: IToken;
  totalPlatformFeeGain: string;
  totalOriginPlatformFeeGain: string;
};

export enum MintStatusEnum {
  ON_PAUSE,
  ONLY_WHITELIST,
  PUBLIC,
}

export type IKeyword = {
  id: string;
};

export type IServiceDetails = {
  id: string;
  title?: string;
  about?: string;
  keywords: IKeyword[];
  rateAmount?: string;
  rateToken?: string;
  keywords_raw?: string;
  startDate?: string;
  expectedEndDate?: string;
};

export type IServiceDetailsBuyer = {
  title: string;
  about: string;
  rateAmount: string;
  rateToken: string;
  buyerHandle: string;
  buyerId: string;
  buyerServiceCount: string;
  buyerRating: string;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
};

export type IReview = {
  id: string;
  service: IService;
  to: IUser;
  uri: string;
  rating: number;
  createdAt: string;
  description?: IReviewDetails;
};

export type IReviewDetails = {
  id: string;
  content: string;
};

export enum ServiceStatusEnum {
  Opened = 'Opened',
  Confirmed = 'Confirmed',
  Finished = 'Finished',
  Cancelled = 'Cancelled',
  Uncompleted = 'Uncompleted',
}

export enum ProposalStatusEnum {
  Pending = 'Pending',
  Validated = 'Validated',
  Rejected = 'Rejected',
}

export type IProposalDetails = {
  id: string;
  title: string;
  about: string;
  startDate: string;
  expectedHours: string;
  service: IService;
  expirationDate: string;
  videoUrl?: string;
};

export type IProposal = {
  id: string;
  cid: string;
  status: ProposalStatusEnum;
  seller: IUser;
  rateToken: IToken;
  rateAmount: string;
  service: IService;
  // transaction: ITransaction;
  platform: IPlatform;
  createdAt: string;
  updatedAt: string;
  description?: IProposalDetails;
  expirationDate: string;
};

export type IFees = {
  protocolEscrowFeeRate: number;
  originServiceFeeRate: number;
  originValidatedProposalFeeRate: number;
};

export enum ProposalTypeEnum {
  Hourly = 1,
  Flat,
  Milestone,
}

export enum ProfileTypeEnum {
  Buyer = 1,
  Seller,
}

export enum PaymentTypeEnum {
  Release = 'Release',
  Reimburse = 'Reimburse',
}

export enum NetworkEnum {
  LOCAL = 1337,
  MUMBAI = 80001,
  IEXEC = 134,
}

export type IToken = {
  name: string;
  address: `0x${string}`;
  symbol: string;
  decimals: number;
  minimumTransactionAmount?: string;
};

export type ITokenFormattedValues = {
  roundedValue: string;
  exactValue: string;
};

export type IPayment = {
  createdAt: number;
  id: string;
  amount: string;
  rateToken: IToken;
  paymentType: PaymentTypeEnum;
  transactionHash: string;
  service: IService;
};

export type IUserGain = {
  id: string;
  user: IUser;
  token: IToken;
  totalGain: string;
};

export enum EmailType {
  NewProposal = 'newProposal',
  ProposalValidated = 'proposalValidated',
  FundRelease = 'fundRelease',
  Review = 'review',
  PlatformMarketing = 'platformMarketing',
  ProtocolMarketing = 'protocolMarketing',
  NewService = 'newService',
}

export enum Web3mailPreferences {
  activeOnNewService = 'activeOnNewService',
  activeOnNewProposal = 'activeOnNewProposal',
  activeOnProposalValidated = 'activeOnProposalValidated',
  activeOnFundRelease = 'activeOnFundRelease',
  activeOnReview = 'activeOnReview',
  activeOnPlatformMarketing = 'activeOnPlatformMarketing',
  activeOnProtocolMarketing = 'activeOnProtocolMarketing',
}
