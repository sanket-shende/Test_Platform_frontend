import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import MyTest from "./pages/MyTest.jsx";
import CreateTest from "./pages/CreateTest.jsx";
import CreateQue from "./pages/CreateQue.jsx";
import GiveTest from "./pages/GiveTest.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ShowTest from "./pages/ShowTest.jsx";
import Result from "./pages/Result.jsx";

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App/>,
//         children: [
//             {
//                 path: "",
//                 element: <Home/>
//             },
//             {
//                 path: "Mytest",
//                 element: <MyTest/>
//             }
//         ]
//     }
// ])

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="mytest" element={<App />}>
                <Route index element={<MyTest />} />
                <Route path="create" element={<App />}>
                    <Route index element={<CreateTest />} />
                    <Route path="ques" element={<CreateQue />} />
                </Route>
            </Route>
            <Route path=":id/solve" element={<App />}>
                <Route index element={<GiveTest />} />
            </Route>
            <Route path=":id/show" element={<App />}>
                <Route index element={<ShowTest />} />
            </Route>
            <Route path=":id/result" element={<App />}>
                <Route index element={<Result />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
