import Context from '~/states/Context';
import { useContext } from 'react';
const useValueContext = () => {
  const contextValue = useContext(Context);
  return contextValue;
};

export default useValueContext;
