import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CandidateList from "./components/CandidateList"
import CandidateForm from './components/CandidateForm'
import CandidateAddForm from './components/CandidateAddForm'
import './App.css'
import RecruiterList from './components/RecruiterList'
import RecruiterPostForm from './components/RecruiterJobPostForm'
import RecruiterForm from './components/RecruiterForm'
import AvailableJobs from './components/AvailableJobs'
import ApplyForm from './components/ApplyForm/Index'
import NotFound from './components/NotFound'

function App() {
  
  return (
    <BrowserRouter>
         <Routes>
             <Route path="/" element={<CandidateList/>}/>
             <Route path="/form" element={<CandidateAddForm/>}/>
             <Route path="/form/:id" element={<CandidateForm/>}/>
             <Route path="/recruiter" element ={<RecruiterList/>} />
             <Route path="/postjob" element={<RecruiterPostForm/>}/>
             <Route path="/recruiter/:id" element={<RecruiterForm/>}/>
             <Route path="/openings" element={<AvailableJobs/>}/>
             <Route path="/jobapply/:id" element={<ApplyForm/>}/>
             <Route path="*" element={<NotFound/>} />
             
         </Routes>
    </BrowserRouter>
  )
  
}

export default App
