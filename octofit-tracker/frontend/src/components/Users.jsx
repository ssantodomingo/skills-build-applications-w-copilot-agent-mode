import { useEffect, useState } from 'react'

// Set VITE_CODESPACE_NAME in .env.local when running inside a GitHub Codespace.
// Example: VITE_CODESPACE_NAME=my-codespace-abc123
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

const normalize = (data) =>
  Array.isArray(data) ? data : (data?.results ?? data?.data ?? data?.items ?? [])

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json() })
      .then((data) => setUsers(normalize(data)))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">Users: {error}</div>

  return (
    <div>
      <h2 className="mb-3">Users</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Username</th><th>Email</th><th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0
            ? <tr><td colSpan={3} className="text-center text-muted">No users found.</td></tr>
            : users.map((u) => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
