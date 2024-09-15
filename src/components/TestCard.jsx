import './TestCard.css'

function TestCard({title, description}) {
	return (
		<div className="Testcard">
			<img src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img" />
			<div className="topic">
				<p>{title}</p>
			</div>
			<div className="description">
				<p>{description}</p>
			</div>
		</div>
	);
}

export default TestCard