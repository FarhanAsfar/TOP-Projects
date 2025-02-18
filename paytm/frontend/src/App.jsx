import "./App.css"

import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import SendMoney from "./components/SendMoney"

import {BrowserRouter, Route, Routes, } from "react-router-dom"


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send-money" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
