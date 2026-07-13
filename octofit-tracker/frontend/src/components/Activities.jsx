import { useEffect, useState } from 'react'

// Set VITE_CODESPACE_NAME in .env.local when running inside a GitHub Codespace.
// Example: VITE_CODESPACE_NAME=my-codespace-abc123
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

const normalize = (data) =>
  Array.isArray(data) ? data : (data?.results ?? data?.data ?? data?.items ?? [])

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json() })
      .then((data) => setActivities(normalize(data)))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">Activities: {error}</div>

  return (
    <div>
      <h2 className="mb-3">Activities</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>User</th><th>Type</th><th>Duration (min)</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.length === 0
            ? <tr><td colSpan={4} className="text-center text-muted">No activities found.</td></tr>
            : activities.map((a) => (
              <tr key={a._id}>
                <td>{a.user?.username ?? a.user}</td>
                <td>{a.type}</td>
                <td>{a.duration}</td>
                <td>{new Date(a.date).toLocaleDateString()}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
