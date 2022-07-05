import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(
      `/api/workouts/${workout._id}`,
      {
        method: 'DELETE',
      }
    );
    // data is the deleted doc
    const data = await response.json();

    console.log('data', data);

    console.log('response.ok', response.ok);

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: data });
    }
  };

  return (
    <div className='workout-details'>
      <h4>{workout.title} </h4>
      <p>
        <strong>Load:</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps:</strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt} </p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
