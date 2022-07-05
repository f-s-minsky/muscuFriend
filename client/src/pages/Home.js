import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');

      // parse json response to array object
      const responseArray = await response.json();

      // update global state - context
      if (response.ok) {
        dispatch({
          type: 'SET_WORKOUTS',
          payload: responseArray,
        });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
            />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
