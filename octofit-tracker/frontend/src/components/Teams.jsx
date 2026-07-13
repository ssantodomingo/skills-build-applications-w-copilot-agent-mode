import { useEffect, useState } from 'react'

// Set VITE_CODESPACE_NAME in .env.local when running inside a GitHub Codespace.
// Example: VITE_CODESPACE_NAME=my-codespace-abc123
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

const normalize = (data) =>
  Array.isArray(data) ? data : (data?.results ?? data?.data ?? data?.items ?? [])

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json() })
      .then((data) => setTeams(normalize(data)))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">Teams: {error}</div>

  return (
    <div>
      <h2 className="mb-3">Teams</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th><th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.length === 0
            ? <tr><td colSpan={2} className="text-center text-muted">No teams found.</td></tr>
            : teams.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.members?.map((m) => m.username ?? m).join(', ')}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
