import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import { useState } from "react";
import axios from 'axios'
import Cookies from "js-cookie";
import { useUser } from '../context/user.jsx';

function Login() {
    const { user, setUser } = useUser();

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    
    const handleChange = (e) =>{
        switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;
            case "password":
                setPassword(e.target.value)
                break;
		}
    }

    const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:8080/api/v1/users/login",
                {email, password}
			);
            const user = response.data.data.user._id
            Cookies.set("User", user, { expires: 7, path: "/" });
            setUser(true);
            navigate("/")
		} catch(error) {
			throw error
		} 
	};

    

	return (
        
        <div className="container">
            <form action="" onSubmit={handleSubmit} method="POST">
            <div className="logo">
                <img src="" alt="logo" />
            </div>
            <div className="inputs-container">
                <label htmlFor="email">Email</label><br />
                <input type="email" onChange={handleChange} value={email} name="email" />
            </div>
            <div className="inputs-container">
                <label htmlFor="password">Password</label><br />
                <input type="password" onChange={handleChange} value={password} name="password" />
            </div>
            <button className="login-btn" >Log In</button>
            <span>Don't have an account? <Link to={"/signup"}><span>Sign Up</span></Link></span>
            </form>
        </div>
	);
}

export default Login;