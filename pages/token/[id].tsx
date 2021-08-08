import { useRouter } from 'next/router';

import { useTokenDetails } from '../../lib/hooks/useTokenDetails';
import { useTokenImage } from '../../lib/hooks/useTokenImage';
import { LinkedOwner } from '../../components/owner/Owner';

const Token = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, token } = useTokenDetails({
    id: id as string
  });

  const image = useTokenImage(token);

  return (
    <div>
      <main>
        <h1>{token?.registry?.name}</h1>
        <h2>
          ${token?.registry?.symbol}: #{token?.identifier}
        </h2>
        <img src={image} />
        <div>
          Metadata URI:{' '}
          <a target="_blank" href={token?.uri}>
            {token?.uri}
          </a>
        </div>
        <div>
          Owner: <LinkedOwner address={token?.owner?.id} enclosingDigits={8} />
        </div>

        <h2>Previous owners</h2>
        <ul>
          {token?.transfers?.map((transfer: any) => (
            <li>
              <LinkedOwner address={transfer?.from?.id} enclosingDigits={8} />
            </li>
          ))}
        </ul>
      </main>

      <style jsx>{`
        img {
          width: 300px;
        }
      `}</style>
    </div>
  );
};

export default Token;
