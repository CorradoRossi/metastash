import { Resolvers, Standard } from './generated';

export const resolvers: Resolvers = {
  Token: {
    standard: async (root, args, { EIP721, EIP1155 }) => {
      console.log('additionalResovers:standard', root, args, EIP1155, EIP721);

      const eip721 = await EIP721.apiQuery.token({ id: root.id });
      const eip1155 = await EIP1155.apiQuery.token({ id: root.id });

      if (eip721) {
        console.log('EIP 721', eip721);
        return Standard.erc721;
      } else {
        console.log('EIP 1155', eip1155);
        return Standard.erc1155;
      }
    }
  }
};
