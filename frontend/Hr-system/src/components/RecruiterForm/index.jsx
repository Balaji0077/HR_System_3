import { useParams,useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import "./index.css"

const RecruiterForm = ()=>{
     const params = useParams();
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("")
    const [status,setStatus] = useState("")
    useEffect(()=>{
        const fetchData = async()=>{
            const data = await fetch(`http://localhost:8080/api/jobs/${params.id}`)
            const response = await data.json();
            setName(response.title);
            setEmail(response.description);
            setPhone(response.requiredSkills);
            setStatus(response.recruiterId);
            
        }

        fetchData();
    },[])
    const changePhone = (event)=>{
        setPhone(event.target.value);
    }
    const changeStatus = (event)=>{
        setStatus(event.target.value)
    }
    const changeName = (event)=>{
         setName(event.target.value)
    }
    const changeEmail = (event)=>{
         setEmail(event.target.value)
    }


    const updatedData = async (event)=>{
        event.preventDefault();
        const updated = {
            id:params.id,
            title:name,
            description:email,
            requiredSkills:phone,
            recruiterId:status
           
        }

        const option = {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updated)
        }

        const fetchData = await fetch(`http://localhost:8080/api/jobs/${params.id}`,option);
        const data = await fetchData.json();
        console.log(data);

        navigate("/recruiter");
    }


    return <div className="update-form">
        <h1>Update Job Details</h1>
        <form className="form-data" onSubmit={updatedData}>
            <div className="form-data-container">
                <label htmlFor="name" className="label-data">Title</label>
                <input type="text" required value={name} onChange={changeName} id="name" className="input-box"/>
            </div>
             <div className="form-data-container">
                <label htmlFor="email" className="label-data">Description</label>
                <input type="text" required value={email} onChange={changeEmail} id="email" className="input-box"/>
            </div>
             <div className="form-data-container">
                <label htmlFor="no" className="label-data">Required Skills</label>
                <input type="text" required value={phone} id="no" className="input-box" onChange={changePhone}/>
            </div>
             <div className="form-data-container">
                <label htmlFor="status" className="label-data">Recruiter Id</label>
                <input type="number" required value={status} id="status" className="input-box" onChange={changeStatus}/>
            </div>
             
            <div className="update-container">
                <button type="submit" className='update-btn'>Update Details</button>
            </div>
        </form>
    </div>
}

export default RecruiterForm
