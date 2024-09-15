import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import { Outlet, useLocation, useParams } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
import { UserProvider } from "./context/user.jsx";

function App() {
    const {id} = useParams()
    
	const location = useLocation();

	const hideLayout =
		location.pathname === "/login" || location.pathname === "/signup" || location.pathname === `/${id}/solve` || location.pathname === `/${id}/show` || location.pathname === `/${id}/result` ;
	return (
		<>
			<UserProvider>
				{!hideLayout  && <Sidebar />}
				{!hideLayout  && <Topbar />}
				<Outlet />
			</UserProvider>
		</>
	);
}

export default App;
