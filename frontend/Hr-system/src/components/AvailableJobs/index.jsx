import {useState,useEffect} from "react"
import {useNavigate,Navigate} from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"
import Navbar from "../Navbar"

const AvailableJobs = ()=>{
       
    const [job,setJob] = useState([]);
    const navigate = useNavigate()
    const checkNow = (id)=>{
        navigate(`/jobapply/${id}`)
    } 
     useEffect(()=>{
        
        const token = Cookies.get("token")
        const option = {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
             } 
        }
        const fetchData = async ()=>{
            const response = await fetch("http://localhost:8080/api/jobs",option);
            const data = await response.json();
            setJob(data)
        }

        fetchData();
     },[]) 
      
     return (
        <>
          {
            
           Cookies.get("token")!==undefined? 
           <div className="available-container">
                  <Navbar/>
                  <div className="image-container">
                       <img src="https://cdn-icons-png.freepik.com/512/17648/17648801.png?ga=GA1.1.1491802060.1757505789" className="opening-image" alt="openings"/>
                       <div className="heading-marquee-container">
                         <h1>JOBS</h1>
                         <marquee width="800px"><h1>HELPING BILLION PEOPLE FIND THEIR RIGHT JOBS</h1></marquee>
                       </div>
                       <img src="https://cdn-icons-png.freepik.com/512/17650/17650414.png?ga=GA1.1.1491802060.1757505789" className="opening-image" alt="openings"/>
                  </div>

                  <div>
                     <ul className="job-list-container">
                        {
                            job.map((each)=>{
                                return (
                                    <li className="list-container" key={each.id}>
                                       <div className="heading-container">
                                            <h2 className="job-headings">Position:</h2>
                                            <h2 className="title-job">{each.title}</h2>
                                       </div> 
                                       <div className="heading-container">
                                            <h2 className="job-headings">Required Skills:</h2>
                                            <h2 className="title-job">{each.requiredSkills}</h2>
                                       </div>
                                    <div className="check-btn-container">
                                         
                                         <button className="check-btn" onClick={()=>checkNow(each.id)}>Check Now </button>
                                     </div>    
                                       
                                    </li>
                                )
                            }) 
                        }

                     </ul>
                  </div>
           </div>
            :
           <Navigate to="/login"/>
           }  
        </>
     )
}

export default AvailableJobs