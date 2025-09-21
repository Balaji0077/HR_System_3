import {useState,useEffect} from 'react'
import {useParams,useNavigate,Navigate} from "react-router-dom"
import Cookies from "js-cookie"
import { FaSuitcase } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";

import "./index.css"

const ApplyForm = ()=>{
    const param = useParams()
 
    const [name,setName] = useState("")
    const [email,setEmail] =  useState("")
    const [error,setError] = useState(false)
    const [job,setJob] = useState({});
    const [applied,setApplied] = useState([])

     const listData = async ()=>{
                
                const token = Cookies.get("token")
                const options={
                    method: "GET",
                   headers: {
                   "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                   } 
                }
                const candidatesData = await fetch(`http://localhost:8080/api/jobs/names/${param.id}`,options);
                const data = await candidatesData.json();
                setApplied([...data]);
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            const token = Cookies.get("token")
                const options={
                    method: "GET",
                   headers: {
                   "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                   } 
                }
            const response = await fetch(`http://localhost:8080/api/jobs/${param.id}`,options);
            const data = await response.json();
            setJob(data)
        }

        fetchData();
     },[]) 

     useEffect(()=>{
          listData()
     },[])

     useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      setError(false);  
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [error]);

     
     const changeName = (event)=>{
        setName(event.target.value);
     }

     const changeEmail = (event)=>{
         setEmail(event.target.value);
     }
     const applyChanges  = async (event)=>{
        event.preventDefault();
        const data = {
            name:name,
            email:email
        }

        const token = Cookies.get("token")
        const option={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                 "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(data)
        }
        const pushData = await fetch(`http://localhost:8080/api/jobs/${param.id}/apply`,option);
        console.log(pushData)
        if(pushData.ok){
           listData();
           setName("");
           setEmail("");
        }
        else{
          setError(true);
          return 
        }
       
        
     }
    return  <>
            {  
              Cookies.get("token")!==undefined?
             
            <div className="apply-container">
           <div className="apply-heading">
              <h1>JOB DETAILS PAGE</h1>
           </div>
           <div>
               <div className="apply-details-container">
                 <div className="apply-flex-containers">
                    <div className="apply-image-context-container">
                        <FaSuitcase className="role-image" />
                        <p className="apply-context">{job.title}</p>
                    </div>
                    <div className="apply-image-context-container">
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.Aybtm6MDgU1PIW2CTpcmLAHaHa%3Fpid%3DApi%26ucfimg%3D1&f=1&ipt=11768879f4121f3b5267a867fae806fdcafa799c59edf20a34fce951487a179a&ipo=images" className="role-image role-image-skills" alt="image"/>
                        <p className="apply-context">{job.description}</p>
                    </div>
                 </div> 
                 <div className="apply-flex-containers">
                    <div className="apply-image-context-container">
                        <img src="https://img.freepik.com/premium-vector/skills-icon-with-settings-sign-skills-icon-customize-setup-manage-process-symbol-vector-icon_775815-966.jpg?w=1480" className="role-image role-image-skills" alt="image"/>
                        <p className="apply-context">{job.requiredSkills}</p>
                    </div> 
                    
                 </div>    
               </div>
               <div className="apply-details-container">
                  <h2>Candidates Who Applied</h2>
                  <ul className="candidates-list-display-container">
                     {  
                        applied.map((each)=>{
                            return <li className="candidates-inner-container"> 
                                 <RiAccountCircleFill className="candidate-profile"/>
                                 <p className="candidate-name-applied">{each}</p> 
                                
                            </li>
                        })
                     }
                  </ul>

               </div>
               <div className="apply-details-container apply-details-container-special">
                <h2>!APPLY NOW!</h2>
                     {error && (
                        <div className="error-popup">
                             <div style={{"text-align":"right"}}><button onClick={() => setError(false)}>❌</button></div>
                             <p>Invalid email!!</p>
                        </div>
                      )}

                    <form onSubmit={applyChanges}>
                        <div>
                           <input type="text" value={name} required placeholder="Enter Candidate Name" onChange={changeName} className="apply-name"/>
                        </div>
                        <div>
                           <input type="email" required placeholder="Enter Candidate Email" onChange={changeEmail} className="apply-name"/>
                        </div>
                        <div className="apply-btn-candidate-container">
                            <button type="submit" value={email} className="apply-btn-candidate">Apply</button>
                        </div>
                        
                    </form>
               </div>
             
           </div>


             </div>
             :
            <Navigate to="/login"/>
        
        }  
        </>
                    
    
   
}

export default ApplyForm
