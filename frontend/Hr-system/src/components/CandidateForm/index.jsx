import { useParams,useNavigate} from "react-router-dom"
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
    
    useEffect(()=>{
        const fetchData = async()=>{
            const data = await fetch(`http://localhost:8080/api/candidates/${params.id}`)
            const response = await data.json();
            setName(response.name);
            setEmail(response.email);
            setPhone(response.phoneNumber);
            setStatus(response.currentStatus);
            setResume(response.resumeLink);
        }

        fetchData();
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

        const option = {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updated)
        }

        const fetchData = await fetch(`http://localhost:8080/api/candidates/${params.id}`,option);
        const data = await fetchData.json();
        console.log(data);

        navigate("/");
    }
   return (
    <div className="update-form">
        <h1>Candidate's Updation Form</h1>
        <form className="form-data" onSubmit={updatedData}>
            <div className="form-data-container">
                <label htmlFor="name" className="label-data">Name</label>
                <input type="text" value={name} disabled id="name" className="input-box input-not-allowed"/>
            </div>
             <div className="form-data-container">
                <label htmlFor="email" className="label-data">Email</label>
                <input type="email" value={email} disabled id="email" className="input-box input-not-allowed"/>
            </div>
             <div className="form-data-container">
                <label htmlFor="no" className="label-data">Phone Number</label>
                <input type="text" value={phone} id="no" className="input-box" onChange={changePhone}/>
            </div>
             <div className="form-data-container">
                <label htmlFor="status" className="label-data">Current Status</label>
                <input type="text" value={status} id="status" className="input-box" onChange={changeStatus}/>
            </div>
             <div className="form-data-container">
                <label htmlFor="resume" className="label-data">Resume Link</label>
                <input type="text" value={resume} id="resume" className="input-box" onChange={changeResume}/>
            </div>
            <div className="update-container">
                <button type="submit" className='update-btn'>Update</button>
            </div>
        </form>
    </div>
    
   )
}

export default CandidateForm
