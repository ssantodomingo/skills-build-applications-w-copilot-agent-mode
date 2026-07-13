import { useEffect, useState } from 'react'

// Set VITE_CODESPACE_NAME in .env.local when running inside a GitHub Codespace.
// Example: VITE_CODESPACE_NAME=my-codespace-abc123
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

const normalize = (data) =>
  Array.isArray(data) ? data : (data?.results ?? data?.data ?? data?.items ?? [])

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json() })
      .then((data) => setWorkouts(normalize(data)))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">Workouts: {error}</div>

  return (
    <div>
      <h2 className="mb-3">Workouts</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th><th>Description</th><th>Exercises</th>
          </tr>
        </thead>
        <tbody>
          {workouts.length === 0
            ? <tr><td colSpan={3} className="text-center text-muted">No workouts found.</td></tr>
            : workouts.map((w) => (
              <tr key={w._id}>
                <td>{w.name}</td>
                <td>{w.description}</td>
                <td>{w.exercises?.join(', ')}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
