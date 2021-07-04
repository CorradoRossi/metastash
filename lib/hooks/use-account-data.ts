import { createContext, useContext } from 'react';

export const acctDataContext = createContext<any | null>(null);

const useAcctData = () => {
  const result = useContext(acctDataContext);
  if (!result) {
    throw new Error();
  }
  return result;
};

export default useAcctData;
