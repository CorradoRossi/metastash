import NFTT from '@fluuuid/nft-contracts/build/contracts/NFTT.json';
import create from 'zustand';
import { Contract, BigNumber, utils, Event } from 'ethers';
import { TokenProps, StateContext } from '@lib/types';
import { DEFAULT_USER } from '@lib/constants';

const useAppState = create<StateContext>((set, get) => ({
  assets: [],
  isAuthenticated: false,
  contract: undefined,
  user: DEFAULT_USER,
  tokensOnSale: [],
  ethPrice: '0.0',
  activatingConnector: undefined,
  transaction: undefined,
  library: undefined,

  setLibrary: (library: any) => set({ library }),
  setAuthenticated: (authenticated: boolean) => set({ isAuthenticated: authenticated }),
  setContract: async (library: any, chainId: number) => {
    try {
      if (!library) throw new Error('No Web3 Found');

      const networkid = (id: number) => {
        switch (id) {
          case 1337:
            return 5777;
          default:
            return id;
        }
      };
      const deployedNetwork =
        NFTT.networks[String(networkid(chainId)) as keyof typeof NFTT.networks];

      if (!deployedNetwork) {
        throw new Error('The network you selected is no supported yet.');
      }

      const { address } = deployedNetwork;
      const contract = new Contract(address, NFTT.abi, library.getSigner());

      const name = await contract.name();
      const symbol = await contract.symbol();

      set({
        library,
        contract,
        contractDetails: {
          name,
          symbol,
          address
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  setUser: async (address?: string) => {
    try {
      const { user, library, getUserTokens } = get();

      const balance = utils.formatEther(await library.getBalance(address || user?.address || ''));
      const ownedTokens = await getUserTokens(address || user?.address);

      set({
        isAuthenticated: true,
        user: { address: address || user?.address || '', balance, ownedTokens }
      });
    } catch (e) {
      console.log(e);
    }
  },
  setAssets: async newAssets => {
    const { assets } = get();
    let combinedAssets = assets.concat(newAssets);
    set({ assets: combinedAssets });
  },
  setTokensOnSale: (tokensOnSale: TokenProps[]) => set({ tokensOnSale: tokensOnSale }),
  setEthPrice: (ethPrice: string) => set({ ethPrice: ethPrice }),
  setActivatingConnector: (activatingConnector: any) =>
    set({ activatingConnector: activatingConnector }),
  setTransaction: (transaction: any) => set({ transaction: transaction }),
  getUserTokens: async (address?: string): Promise<TokenProps[]> => {
    try {
      const { contract, library, user } = get();

      if (!library) throw new Error('No Web3 Found');
      if (!contract) throw new Error('No contract found');
      if (!user?.address && !address) throw new Error('No user found');

      const userAddress = user?.address || address;

      const ownedTokensEvents = contract.filters.Transfer(null, userAddress);
      const results: Event[] = await contract.queryFilter(ownedTokensEvents, 0, 'latest');

      const ownedTokens: Map<string, TokenProps> = new Map();
      await Promise.all(
        results.map(async current => {
          const ownerToken = await contract.ownerOf(current.args?.tokenId);

          if (ownerToken === userAddress) {
            const { id, name, price } = await contract.tokenMeta(current.args?.tokenId);
            const uri = await contract.tokenURI(current.args?.tokenId);

            ownedTokens.set(uri, {
              id,
              name,
              price,
              uri
            });
          }
        })
      );

      return Array.from(ownedTokens).map(([_, token]) => token);
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  buyToken: async (id: string, price: BigNumber) => {
    try {
      const { setTransaction, contract } = get();
      if (!contract) throw new Error('No contract found');
      const tx = await contract.purchaseToken(id, { value: price });
      setTransaction(tx);
    } catch (e) {
      console.log('on buy', e);
    }
  },
  updateTokensOnSale: async () => {
    try {
      const { contract, setTokensOnSale } = get();
      if (!contract) throw new Error('No contract found');

      const tokensForSale = (await contract.getAllOnSale()).reduce((acc: TokenProps[], b: any) => {
        if (b.uri !== '') {
          acc.push({ id: b.id, price: b.price, name: b.name, uri: b.uri });
        }

        return acc;
      }, [] as TokenProps[]);
      setTokensOnSale(tokensForSale);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  setTokenSale: async (id: string, price: BigNumber, onSale: boolean = false) => {
    try {
      const { contract, user, setTransaction } = get();
      if (!contract) throw new Error('No contract found');
      if (!user) throw new Error('No user found');

      const tx = await contract.setTokenSale(id, onSale, price, { from: user.address });
      setTransaction(tx);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  transferToken: async (id: string, to: string) => {
    try {
      const { contract, user, setTransaction } = get();
      if (!contract) throw new Error('No contract found');
      if (!user) throw new Error('No user found');

      const tx = await contract['safeTransferFrom(address,address,uint256)'](user.address, to, id, {
        from: user.address
      });

      console.log(tx);
      setTransaction(tx);
    } catch (e) {
      console.log(e);
    }
  }
}));

export { useAppState };
