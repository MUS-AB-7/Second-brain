import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/Dashboard'
import { SignIn } from './pages/SignIn'
import { Signup } from './pages/SignUp'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/share/:shareId' element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
}

export default App
