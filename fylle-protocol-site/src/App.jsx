import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Build from './pages/Build'
import Landing from './pages/Landing'
import Builder from './pages/Builder'
import Hub from './pages/Hub'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/build" element={<Build />} />
      <Route path="/protocol" element={<Landing />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/hub" element={<Hub />} />
    </Routes>
  )
}
