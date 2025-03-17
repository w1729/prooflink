import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/Index'
import AboutPage from './pages/AboutPage/Index'
import TransactionPage from './pages/TransactionPage/Index'
import Layout from './Layout' // Adjust the path as necessary

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/tx/:txId' element={<TransactionPage />} />
      </Routes>
    </Layout>
  )
}

export default App
