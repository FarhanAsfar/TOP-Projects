import "./App.css"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import {BrowserRouter, Route, Routes, } from "react-router-dom"


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
