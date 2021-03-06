import Link from 'next/link';

export const Owner = ({ address, enclosingDigits = 4 }: any) => (
  <span>
    {address?.slice(0, enclosingDigits + 2)}...{address?.slice(-enclosingDigits)}
  </span>
);

export const LinkedOwner = ({ address, enclosingDigits = 4 }: any) => (
  <Link href={`/owner/${address}`}>
    <a>
      <Owner address={address} enclosingDigits={enclosingDigits} />
    </a>
  </Link>
);
