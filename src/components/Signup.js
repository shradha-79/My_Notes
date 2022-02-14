import React, {useState} from 'react'
import { useNavigate  } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  let history = useNavigate ();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    //calling API from BACKEND
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    //If user doesn't exist already
    if (json.success) {
      // Save the authtoken and redirect 
      localStorage.setItem('token', json.authtoken)
      history("/")
      props.showAlert("Created your account successfully", "success")
    }
    else {
      props.showAlert("Invalid Details", "danger")
    }
  }

  //set credentials
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <div className="container">
      <h2>Create your account to store your notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" aria-describedby="emailHelp" id="Password" name="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup