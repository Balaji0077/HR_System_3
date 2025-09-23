import { useParams,useNavigate,Navigate} from "react-router-dom"
import Cookies from "js-cookie"
import {useState,useEffect} from "react"
import "./index.css"

const CandidateForm = ()=>{
    const params = useParams();
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("")
    const [status,setStatus] = useState("")
    const [resume,setResume] = useState("")
    const [role,setRole] = useState("")
    
    useEffect(()=>{
        const fetchData = async()=>{

             const token = Cookies.get("token")
            const options = {
                method:"GET",
                 headers: {
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
                } 
            }
            const data = await fetch(`http://localhost:8080/api/candidates/${params.id}`,options)
            const response = await data.json();
            setName(response.name);
            setEmail(response.email);
            setPhone(response.phoneNumber);
            setStatus(response.currentStatus);
            setResume(response.resumeLink);
        }

        fetchData();
    },[])

    useEffect(()=>{
      const token = Cookies.get("token")
      const email = Cookies.get("username")
         const option = {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
             } 
         }
        async function role (){
            const response = await fetch(`http://localhost:8080/api/check/${email}`,option)
            const data = await response.json();
            setRole(data.role);
        }

        role()
    },[])

    const changePhone = (event)=>{
        setPhone(event.target.value);
    }
    const changeStatus = (event)=>{
        setStatus(event.target.value)
    }
    const changeResume = (event)=>{
         setResume(event.target.value)
    }

    const updatedData = async (event)=>{
        event.preventDefault();
        const updated = {
            id:params.id,
            name:name,
            email:email,
            phoneNumber:phone,
            currentStatus:status,
            resumeLink:resume
        }
         
        const token = Cookies.get("token") 
        const option = {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updated)
        }

        const fetchData = await fetch(`http://localhost:8080/api/candidates/${params.id}`,option);
        const data = await fetchData.json();
        console.log(data);
        navigate("/");
    }

    
   return (
    <>
    {
       Cookies.get("token")!==undefined && role!=="Role_Candidate"?
          <div className="update-form">
        <h1>Candidate's Updation Form</h1>
        <form className="form-data" onSubmit={updatedData}>
            <div className="form-data-container">
                <label htmlFor="name" className="label-data">Name</label>
                <input type="text" required placeholder="Ex:John Dee" value={name} disabled id="name" className="input-box input-not-allowed"/>
            </div>
             <div className="form-data-container">
                <label htmlFor="email" className="label-data">Email</label>
                <input type="email" required  placeholder="Ex:john@gmail.com" value={email} disabled id="email" className="input-box input-not-allowed"/>
            </div>
             <div className="form-data-container">
                <label htmlFor="no" className="label-data">Phone Number</label>
                <input type="text" required value={phone} placeholder="Ex:9319191991" id="no" className="input-box" onChange={changePhone}/>
            </div>
             <div className="form-data-container">
                <label htmlFor="status" className="label-data">Current Status</label>
                <input type="text" required value={status} id="status" placeholder="Ex:Applied or Interviewing or Completed" className="input-box" onChange={changeStatus}/>
            </div>
             <div className="form-data-container">
                <label htmlFor="resume" className="label-data">Resume Link</label>
                <input type="text" required value={resume} id="resume" className="input-box" placeholder="Ex:https://nameresume.com" onChange={changeResume}/>
            </div>
            <div className="update-container">
                <button type="submit" className='update-btn'>Update</button>
            </div>
        </form>
          </div>
        :
        <Navigate to="/login"/>
    }
   </>
   )
}

export default CandidateForm
