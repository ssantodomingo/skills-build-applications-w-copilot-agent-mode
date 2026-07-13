import { useEffect, useState } from 'react'

// Set VITE_CODESPACE_NAME in .env.local when running inside a GitHub Codespace.
// Example: VITE_CODESPACE_NAME=my-codespace-abc123
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard'

const normalize = (data) =>
  Array.isArray(data) ? data : (data?.results ?? data?.data ?? data?.items ?? [])

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json() })
      .then((data) => setEntries(normalize(data)))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">Leaderboard: {error}</div>

  return (
    <div>
      <h2 className="mb-3">Leaderboard</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Rank</th><th>User</th><th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0
            ? <tr><td colSpan={3} className="text-center text-muted">No entries found.</td></tr>
            : entries.map((e, i) => (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td>{e.user?.username ?? e.user}</td>
                <td>{e.score}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
