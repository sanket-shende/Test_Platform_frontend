import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateTest.css";
import axios from "axios";
import Cookies from "js-cookie";

const TestForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [validity, setValidity] = useState("1");
	const [status, setStatus] = useState("public");
	const [paid, setPaid] = useState("no");
	const [price, setPrice] = useState("");
    const navigate = useNavigate()

	const handleChange = (e) => {
		switch (e.target.name) {
			case "title":
				setTitle(e.target.value);
				break;
            case "description":
                setDescription(e.target.value)
                break;
            case "validity":
                setValidity(e.target.value)
                break;
            case "status":
                setStatus(e.target.value)
                break;
            case "paid":
                setPaid(e.target.value)
                break;
            case "price":
                setPrice(e.target.value)
                break;
			default:
				console.log("error");
				break;
		}
	};    

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"/api/v1/test/create",
		        { title: title , description: description, validity: validity, status: status, price: price, paid: paid }
			);
            const testId = response.data.data._id 
            Cookies.set("TestId", testId,);
           navigate("ques")

		} catch(error) {
			throw error
		} 
	};

	return (
		<div className="test-container">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Title"
					name="title"
					value={title}
					onChange={handleChange}
				/>
				<textarea
					placeholder="Description"
					name="description"
					value={description}
					onChange={handleChange}
				></textarea>
				<div className="dropdown-container">
					<p>Test valid till</p>
					<div className="dropdown">
						<select
							className="dropdown-content"
							name="validity"
							value={validity}
							onChange={handleChange}
						>
							<option value="1">1 Hour</option>
							<option value="2">1 Day</option>
							<option value="3">1 Week</option>
							<option value="4">1 Month</option>
							<option value="5">1 Year</option>
						</select>
					</div>
				</div>
				<div className="instruction">
					*Test will open to give till this time after creating.
				</div>
				<div className="dropdown-container">
					<p>Status</p>
					<div className="dropdown">
						<select
							className="dropdown-content"
							name="status"
							value={status}
							onChange={handleChange}
						>
							<option value="Public">Public</option>
							<option value="Private">Private</option>
						</select>
					</div>
				</div>
				<div className="instruction">
					*Private test will only see your follower and those you
					share link with. Public test will see anyone.
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default TestForm;

// function CreateTest() {
// 	const [data, setData] = useState({
// 		title: "",
// 		description: "",
// 		validity: "",
// 		status: "",
// 		paid: "",
// 		price: "",
// 	});
// 	const [error, setError] = useState(null);
// 	const [loading, setLoading] = useState(true);

// 	const createTest = async () => {
// 		try {
// 			// const response = await axios.post(
// 			// 	"http://localhost:8080/api/v1/test/create",
// 			// 	data
// 			// );
// 			console.log(data);
// 		} catch (err) {
// 			setError(err.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};
// 			console.log(data);

//     function onchange(){
//         console.log(Element);

//     }

// 	return (
// 		<div className="test-container">
// 			<form action="" method="post">
// 				<input type="text" placeholder="Title" name="title" onChange={onchange} />
// 				<textarea
// 					placeholder="Description"
// 					name={data.description}
// 				></textarea>
// 				<div className="dropdown-container">
// 					<p>Test valid till</p>
// 					<div className="dropdown">
// 						<select className="dropdown-content" name="validity">
// 							<option value="1 Day">1 Hour</option>
// 							<option value="1 Day">1 Day</option>
// 							<option value="1 Week">1 Week</option>
// 							<option value="1 Month">1 Month</option>
// 							<option value="1 Year">1 Year</option>
// 						</select>
// 					</div>
// 				</div>
// 				<div className="instruction">
// 					*Test will open to give till this time after creating.
// 				</div>
// 				<div className="dropdown-container">
// 					<p>status</p>
// 					<div className="dropdown">
// 						<select className="dropdown-content" name="status">
// 							<option>Public</option>
// 							<option>Private</option>
// 						</select>
// 					</div>
// 				</div>
// 				<div className="instruction">
// 					*Private test will only see your follower and those you
// 					share link with. Public test will see anyone.
// 				</div>
// 				<Link to="ques">
// 					<button onClick={createTest}>Create</button>
// 				</Link>
// 			</form>
// 		</div>
// 	);
// }

// export default CreateTest;
