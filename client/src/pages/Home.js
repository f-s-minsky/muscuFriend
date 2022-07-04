import { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';

const Home = () => {
  const [workouts, setworkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      console.log('response', response);

      // parse json response to array object
      const responseArray = await response.json();

      if (response.ok) {
        setworkouts(responseArray);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  );
};

export default Home;
