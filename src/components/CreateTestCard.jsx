import "./CreateTestCard.css";
import { Link,NavLink } from "react-router-dom";

function CreateTestCard() {
	return (
		<Link to={"create"} className="createtestcard-container">
			<h2>Create your test</h2>
			<div className="Test-card">
				<div className="icon">
					<i className="fa-solid fa-plus"></i>
				</div>
			</div>
		</Link>
	);
}

export default CreateTestCard;
