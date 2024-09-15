import { useEffect,useState } from "react";
import RowTestCard from "../components/RowTestCard";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import TestCard from "../components/TestCard";
import Cookies from "js-cookie";


function Home() {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Define an async function inside useEffect
		const fetchData = async () => {
			try {
				const response = await axios.post(
					"http://localhost:8080/api/v1/test/getalltest"
				);
				// Update state with fetched data
				setData(response.data.data);
			} catch (err) {
				// Handle errors
				setError(err.message);
			} finally {
				// Set loading to false regardless of success or failure
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="test-container">
			{data.length > 0 ? (
				data.map((d,i) => (
                    <Link to={`${d._id}/show`} target="_blank">
					<TestCard
						key={i} // Assuming each item has a unique `id`
						title={d.title}
						description={d.description}
					/>
                    </Link>
				))
			) : (
				<div>No data available</div>
			)}
		</div>
	);
}

export default Home;
