import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Layout from './layouts/Layout'
import BuyShares from './pages/BuyShares'
import CompareStockPrices from './pages/CompareStockPrices'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Layout />}>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/buy' element={<BuyShares />}></Route>
          <Route path='/compare' element={<CompareStockPrices />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
