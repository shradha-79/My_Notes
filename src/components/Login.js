import React, {useState} from 'react'
import { useNavigate  } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history = useNavigate ();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        //Calling API from BACKEND
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        //If credentials are correct
        if(json.success){
            // Save the authtoken and redirect 
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Successfully loged in", "success")
            history("/")
        }
        else{
            props.showAlert("Invalid credentials", "danger")
        }
    }

    //Adding value to credentials
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})

    }

    return (
        <div className='mt-3'>
            <h2>Login to see your Notes</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary my-2" >Submit</button>
            </form>
        </div>
    )
}

export default Login