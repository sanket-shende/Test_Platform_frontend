import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import { useState } from "react";
import axios from "axios";


function Signup() {

    const navigate = useNavigate()
    const [username, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [password, usePassword] = useState("")
    
    const handleChange = (e) =>{
        switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;
            case "password":
                usePassword(e.target.value)
                break;
            case "username":
                setUser(e.target.value)
                break;
		}
    }

    const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:8080/api/v1/users/register",
                {username, email, password}
			);
            navigate("/")
		} catch(error) {
			throw error
		} 
	};
    

	return (
        
        <div className="container">
            <form action="" onSubmit={handleSubmit}>
            <div className="logo">
                <img src="" alt="logo" />
            </div>
            <div className="inputs-container">
                <label htmlFor="name">Name</label><br />
                <input type="text" onChange={handleChange} value={username} name="username" />
            </div>
            <div className="inputs-container">
                <label htmlFor="email">Email</label><br />
                <input type="email" onChange={handleChange} value={email} name="email" />
            </div>
            <div className="inputs-container">
                <label htmlFor="password">Password</label><br />
                <input type="password" onChange={handleChange} value={password} name="password" />
            </div>
            <button className="login-btn" >Sign Up</button>
            <span>Already have an account? <Link to={"/login"}><span>Log In</span></Link></span>
            </form>
        </div>
	);
}

export default Signup;