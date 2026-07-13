import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((err) => console.error('Failed to fetch workouts:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Exercises</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((w) => (
            <tr key={w._id}>
              <td>{w.name}</td>
              <td>{w.description}</td>
              <td>{w.exercises?.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
