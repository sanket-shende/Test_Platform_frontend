import TestCard from "./TestCard";
import "./RowTestCard.css";

function RowTestCard({title, description}) {
	return (
		<div className="RowTestCard">
			<h2>New Test</h2>
			<div className="cards">
				<TestCard title={title} description={description}/>
			</div>
		</div>
	);
}

export default RowTestCard;
