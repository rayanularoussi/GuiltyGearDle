
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {HomePage} from './pages/HomePage'
import { GTRank } from './pages/GTRank'
import { GTCharacter } from './pages/GTCharacter'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/daredevil" element={<GTCharacter />} />
        <Route path="/vanquisher" element={<GTRank />} />
      </Routes>  
    </BrowserRouter>
  )
}

export default App
