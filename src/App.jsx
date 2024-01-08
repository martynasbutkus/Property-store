import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Add from './pages/Add'
import Main from './pages/Main'

function App() {
  return (
    <>
      <header>
        <div className="container">
          <h1>Property List</h1>
          <p>See all the houses you want!</p>
        </div>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/add' element={<Add />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

