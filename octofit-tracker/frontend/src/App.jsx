import { Routes, Route, NavLink } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const NAV_LINKS = [
  { to: '/activities',  label: 'Activities'  },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams',       label: 'Teams'       },
  { to: '/users',       label: 'Users'       },
  { to: '/workouts',    label: 'Workouts'    },
]

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand fw-bold">🐙 OctoFit Tracker</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {NAV_LINKS.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active fw-semibold' : '')
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/"            element={<Activities />}  />
          <Route path="/activities"  element={<Activities />}  />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams"       element={<Teams />}       />
          <Route path="/users"       element={<Users />}       />
          <Route path="/workouts"    element={<Workouts />}    />
        </Routes>
      </main>
    </>
  )
}

export default App
