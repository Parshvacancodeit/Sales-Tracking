import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AdminDashboard from './dashboards/AdminDashboard'
import TelecallerDashboard from './dashboards/TelecallerDashboard'
import ExecutiveDashboard from './dashboards/ExecutiveDashboard'

import Login from './components/Login'

function App() {
  return (
    <Routes>
    <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/telecaller" element={<TelecallerDashboard />} />
      <Route path="/executive" element={<ExecutiveDashboard />} />
    </Routes>
  )
}

export default App
