import { useParams,useNavigate,Navigate} from "react-router-dom"
import {useState,useEffect} from "react"
import Cookies from "js-cookie"
import "./index.css"


const CandidateAddForm = ()=>{
   
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("")
    const [status,setStatus] = useState("")
    const [resume,setResume] = useState("")
    
    
    const changeName = (event)=>{
        setName(event.target.value);
    }

    const changeEmail = (event)=>{
        setEmail(event.target.value);
    }

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
            
            name:name,
            email:email,
            phoneNumber:phone,
            currentStatus:status,
            resumeLink:resume
        }

        const option = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updated)
        }

        const fetchData = await fetch(`http://localhost:8080/api/candidates`,option);
        const data = await fetchData.json();
        console.log(data);

        navigate("/");
    }
   return (
    <>
    { Cookies.get("token")!==undefined?
            <div className="update-form">
                <h1>Candidate's Registration Form</h1>
                <form className="form-data" onSubmit={updatedData}>
                    <div className="form-data-container">
                        <label htmlFor="name" className="label-data">Name</label>
                        <input type="text" required value={name} onChange={changeName} id="name" className="input-box"/>
                    </div>
                    <div className="form-data-container">
                        <label htmlFor="email" className="label-data">Email</label>
                        <input type="email" required value={email} onChange={changeEmail} id="email" className="input-box"/>
                    </div>
                    <div className="form-data-container">
                        <label htmlFor="no" className="label-data">Phone Number</label>
                        <input type="text" required value={phone} id="no" className="input-box" onChange={changePhone}/>
                    </div>
                    <div className="form-data-container">
                        <label htmlFor="status" className="label-data">Current Status</label>
                        <input type="text" required value={status} id="status" className="input-box" onChange={changeStatus}/>
                    </div>
                    <div className="form-data-container">
                        <label htmlFor="resume" className="label-data">Resume Link</label>
                        <input type="text" required value={resume} id="resume" className="input-box" onChange={changeResume}/>
                    </div>
                    <div className="update-container">
                        <button type="submit" className='update-btn'>Add Candidate</button>
                    </div>
                </form>
            </div>
    :

    <Navigate to="/login"/>
    
    }
   </> 
   )
}

export default CandidateAddForm
