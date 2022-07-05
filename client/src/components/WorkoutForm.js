import { useState } from 'react';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    console.log('workout in handleSubmit', workout);

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      // responseData.error object from backend controllers
      setError(responseData.error);
      setEmptyFields(responseData.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      setTitle('');
      setLoad('');
      setReps('');
      console.log('new workout added:', responseData);
      dispatch({
        type: 'CREATE_WORKOUT',
        payload: responseData,
      });
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Ajouter un Exercice</h3>

      <label>Nom de l'Exercice:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={
          emptyFields.includes('title') ? 'error' : ''
        }
      />

      <label>Charge:</label>
      <input
        type='number'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={
          emptyFields.includes('load') ? 'error' : ''
        }
      />

      <label>Répétitions:</label>
      <input
        type='number'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={
          emptyFields.includes('reps') ? 'error' : ''
        }
      />

      <button>Ajouter Exercice</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
