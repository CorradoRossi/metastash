import { useRouter } from 'next/router';

import { Form } from '../../components/form/Form';
import { Owner } from '../../components/owner/Owner';
import { Token } from '../../components/token/Token';
import { useNFTsOfOwner } from '../../lib/hooks/useNFTsOfOwner';

const OwnerPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const { loading, error, nfts } = useNFTsOfOwner({
    address: address as string
  });

  return (
    <div>
      <main>
        <Form initialAddress={address as string} />
        <h1>
          NFTs owned by <Owner address={address} />:
        </h1>
        {nfts.map((nft: any) => (
          <Token key={nft.id} {...nft} />
        ))}
      </main>
    </div>
  );
};

export default OwnerPage;
