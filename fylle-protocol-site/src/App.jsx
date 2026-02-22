import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Builder from './pages/Builder'
import Hub from './pages/Hub'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/hub" element={<Hub />} />
    </Routes>
  )
}
