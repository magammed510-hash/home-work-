import { Routes, Route, Link } from 'react-router-dom'
import DIV1 from './Component/card1'
import DIV2 from './Component/card2'

function App() {
  return (
    <div>
      <nav style={{
        padding: '20px',
        display: 'flex',
        gap: '20px',
        background: '#f3f4f6'
      }}>
        <Link to="/">Page 1</Link>
        <Link to="/page2">Page 2</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DIV1 />} />
        <Route path="/page2" element={<DIV2 />} />
      </Routes>
    </div>
  )
}

export default App