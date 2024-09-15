import "./Topbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useUser } from '../context/user.jsx';


function Topbar() {
    const { user } = useUser();
    
	return (
		<div className="topbar">
			{user ? (
				<i className="fa-solid fa-user"></i>
			) : (
				<div>
					<Link to={"/login"}>
						<button>Login</button>
					</Link>{" "}
					<Link to={"/signup"}>
						<button>Signup</button>
					</Link>
				</div>
			)}
		</div>
	);
}

export default Topbar;
