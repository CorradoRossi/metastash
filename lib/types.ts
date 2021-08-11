import { BigNumber, Contract } from 'ethers';

export type Image = {
  url: string;
};

export type DataObject = {
  assets: [];
};

export type Collectible = {
  name?: string;
  bio?: string;
  title?: string;
  slug?: string;
  twitter?: string;
  github?: string;
  company?: string;
  talk?: Talk;
  image?: Image;
  imageSquare?: Image;
  image_preview_url?: any;
  description?: any;
  permalink?: any;
  external_link?: any;
};

export type Collectibles = {
  collectibles: Collectible[];
};

export type Platform = {
  name: string;
  slug: string;
  stream: string;
  discord: string;
  schedule: Talk[];
};

export type Talk = {
  title: string;
  description: string;
  start: string;
  end: string;
  collectible: Collectible[];
};

export type Link = {
  url: string;
};

export type Sponsor = {
  name: string;
  description: string;
  slug: string;
  website: string;
  callToAction: string;
  callToActionLink: string;
  links: SponsorLink[];
  discord: string;
  tier: string;
  cardImage: Image;
  logo: Image;
  youtubeSlug: string;
};

export type SponsorLink = {
  text: string;
  url: string;
};

export type Job = {
  id: string;
  companyName: string;
  title: string;
  description: string;
  discord: string;
  link: string;
  rank: number;
};

export type HomeUser = {
  id?: string;
  email: string;
  ticketNumber: number;
  name?: string;
  username?: string;
  createdAt: number;
};

export type GitHubOAuthData =
  | {
      type: 'token';
      token: string;
    }
  | {
      type: 'user';
      name: string;
      login: string;
    };

export type HomeProps = {
  defaultUserData: UserData;
  sharePage?: boolean;
  defaultPageState?: PageState;
};

export type TicketProps = {
  username: UserData['username'];
  ticketNumber: UserData['ticketNumber'];
  name: UserData['name'];
  sharePage?: boolean;
};

export type ScheduleProps = {
  allPlatforms: Platform[];
};

export type JobsProps = {
  jobs: Job[];
};

export type MarketPageProps = {
  sponsors: Sponsor[];
};

export type TicketShareProps = {
  username: string | null;
  usernameFromParams: string | null;
  name: string | null;
  ticketNumber: number | null;
};

export type PlatformPageProps = {
  platform: Platform;
  allPlatforms: Platform[];
};

export type CollectionPageProps = {
  collectible: Collectible;
  allCollectibles?: Collectible[];
};

export type SponsorPageProps = {
  sponsor: Sponsor;
};

export type SponsorsGridProps = {
  sponsors: Sponsor[];
};

export type SchedulePlatformProps = {
  allPlatforms: Platform[];
};

export type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export type MonitizeEvent = {
  id: string;
  username: string;
  value: number;
  transactionHash: string;
};

export type PageState = 'registration' | 'ticket' | 'loggedin';

export type UserData = {
  id?: string;
  ticketNumber?: number;
  address?: string;
  name?: string;
  username?: string;
  discord?: string;
  avatar?: string;
  avatar_url?: string;
  bio?: string;
  twitter?: string;
  github?: string;
  title?: string;
  balance?: string;
  ownedTokens?: TokenProps[];
};

export type HomeDataContextType = {
  acctData?: object | any;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
};

export type FormatDateProps = {
  key: string;
  talk: Talk;
  showTime: boolean;
};

export type PlatformContainerProps = {
  platform: Platform;
  allPlatforms: Platform[];
};

export type SponsorSectionProps = {
  sponsor: Sponsor;
};

export type CollectionGridProps = {
  allCollectibles?: Collectible[];
  collectibles: Collectible[];
  assets?: any;
  account?: any;
};

export type CollectionSectionProps = {
  collectible: Collectible;
};

export type ScheduleSidebarProps = {
  allPlatforms: Platform[];
};

export type PageProps = {
  meta: Meta;
  children: React.ReactNode;
  fullViewport?: boolean;
};

export type Meta = {
  title: string | null;
  description: string | null;
  image?: string | null;
  url?: string | null;
};

export interface LoadingDotsProps {
  size?: number;
  height?: number | string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export type LayoutProps = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
};

export type FormState = 'default' | 'loading' | 'error';

export type CompanyJobsProps = {
  jobs: Job[];
};

export interface ImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export type HeaderProps = {
  hero: React.ReactNode;
  description: React.ReactNode;
};

export type FormProps = {
  sharePage?: boolean;
};

export type TicketGenerationState = 'default' | 'loading';

export type TicketVisualProps = {
  size?: number;
  name?: string;
  ticketNumber?: number;
  username?: string;
  ticketGenerationState?: TicketGenerationState;
};

export type TicketProfileProps = {
  name?: string;
  username?: string;
  size?: number;
  ticketGenerationState: TicketGenerationState;
};

export type TicketNumberProps = {
  number: number;
};

export type TicketFormProps = {
  defaultUsername?: string;
  setTicketGenerationState: React.Dispatch<React.SetStateAction<TicketGenerationState>>;
};

export type TicketCopyProps = {
  username: string;
};

export type TicketActionsProps = {
  username: string;
};

export type WalletProps = {
  formState?: string;
  text?: string;
  modalOpen?: boolean;
  provider: any;
  loadWeb3Modal: any;
  logoutOfWeb3Modal: any;
};

export type IconCheckProps = {
  color: string;
  size: number;
};

export type IconDownloadProps = { width: number | string };
export type IconLinkedinProps = { width: number | string };
export type IconTwitterProps = { width: number | string };
export type PlatformLogoProps = { color: string; height?: number | string };

export type IconGithubProps = {
  color: string;
  size: number;
};

export type NetworkTypes = {
  mainnet: 'georli' | 'kovan' | 'mainnet' | 'rinkeby' | 'ropsten';
};

export interface Asset {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
}

export interface RainbowToken extends Asset {
  color?: string;
  highLiquidity?: boolean;
  totalLiquidity?: number;
  favorite?: boolean;
  isRainbowCurated?: boolean;
  isVerified?: boolean;
  shadowColor?: string;
  uniqueId: string;
}

export interface StateContext {
  assets: any;
  rawAssets: any;
  isAuthenticated: boolean;
  contract?: Contract;
  contractDetails?: ContractPropsDetails;
  user?: UserData;
  tokensOnSale?: TokenProps[];
  ethPrice?: string;
  activatingConnector?: any;
  transaction?: any;
  library?: any;
  setAssets(newAssets: any): void;
  setRawAssets(newAssets: any): void;
  setLibrary(library: any): void;
  setContract(library: any, chainId: any): void;
  setAuthenticated(authenticated: boolean): void;
  setTokensOnSale(tokensOnSale: TokenProps[]): void;
  setEthPrice(ethPrice: string): void;
  setActivatingConnector(activatingConnector: any): void;
  setTransaction(transaction: any): void;
  buyToken(id: string, price: BigNumber): void;
  setUser(address?: string): void;
  updateTokensOnSale(): Promise<boolean>;
  setTokenSale(id: string, price: BigNumber, onSale: boolean): Promise<boolean>;
  transferToken(id: string, to: string): void;
  getUserTokens(address?: string): Promise<TokenProps[]>;
}

export type TokenProps = {
  id: string;
  uri: string;
  price: BigNumber;
  name: string;
};

export type ContractPropsDetails = {
  name?: string;
  symbol?: string;
  address?: string;
};
