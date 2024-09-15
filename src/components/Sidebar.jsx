import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useUser } from '../context/user.jsx';


function Sidebar() {
    const { user, setUser } = useUser();
    console.log(user, "insidebar");
    

    const handleSubmit = async (e) => {
        
		try {
			const response = await axios.post(
				"http://localhost:8080/api/v1/users/logout",
			);
            Cookies.remove("User")
            setUser(false);
		} catch(error) {
			throw error
		} 
	};

	return (
		<div className="Sidebar">
			<div className="upper-btn ">
				<img src="" alt="logo" />
				<NavLink
					to={"/"}
					className={({ isActive }) =>
						` home ${isActive ? "active" : ""}`
					}
				>
					<i className="fa-solid fa-house"></i>
					<p>Home</p>
				</NavLink>

				<NavLink
					to={"/mytest"}
					className={({ isActive }) =>
						` test ${isActive ? "active" : ""}`
					}
				>
					<i className="fa-solid fa-book-open"></i>
					<p>Test</p>
				</NavLink>
			</div>
            {user && (
                <div className="lower-btn">
                    <div className="logout">
                        <i className="fa-solid fa-door-closed"></i>
                        <p onClick={handleSubmit}>Logout</p>
                    </div>
                </div>
            )}
		</div>
	);
}

export default Sidebar;
