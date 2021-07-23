import { useState, useEffect } from 'react';
import useEagerConnect from '@lib/hooks/useEagerConnect';
import useInactiveListener from '@lib/hooks/useInactiveListener';

const Web3ReactManager = ({ children }: { children: JSX.Element }) => {
  const [active, setActive] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true);
      setActive(true);
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!triedEager) {
    return null;
  }

  if (!active) {
    return showLoader ? <p>loading...</p> : null;
  }

  return children;
};

export default Web3ReactManager;
