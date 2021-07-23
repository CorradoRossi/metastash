import { useEffect } from 'react';
export default function redirect() {
  useEffect(() => {
    window.location.assign('https://www.cryptovoxels.com/play?coords=N@626E,325S');
  });
  return <></>;
}
