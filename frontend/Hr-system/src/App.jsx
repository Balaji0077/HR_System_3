import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CandidateList from "./components/CandidateList"
import CandidateForm from './components/CandidateForm'
import CandidateAddForm from './components/CandidateAddForm'
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
         <Routes>
             <Route path="/" element={<CandidateList/>}/>
             <Route path="/form" element={<CandidateAddForm/>}/>
             <Route path="/form/:id" element={<CandidateForm/>}/>
             
         </Routes>
    </BrowserRouter>
  )
  
}

export default App
