import { useEffect, useRef } from 'react';
import useBlockNumber from './useBlockNumber';

const useKeepSWRDataLiveAsBlocksArrive = (mutate: any) => {
  const mutateRef = useRef(mutate);

  useEffect(() => {
    mutateRef.current = mutate;
  });

  const { data } = useBlockNumber();

  useEffect(() => {
    mutateRef.current();
  }, [data]);
};

export default useKeepSWRDataLiveAsBlocksArrive;
