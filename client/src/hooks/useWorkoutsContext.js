import { WorkoutsContext } from '../context/WorkoutsContext';
import { useContext } from 'react';

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  // check if context is not null
  if (!context) {
    throw Error(
      'useWorkoutsContext must be used inside an WorkoutsContextProvider'
    );
  }

  return context;
};
