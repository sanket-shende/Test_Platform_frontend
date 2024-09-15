import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import "./GiveTest.css";

function GiveTest() {
	const { id } = useParams();
	const [testData, setTestData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({}); 

	useEffect(() => {
		const getTest = async () => {
			try {
				const response = await axios.post(
					`http://localhost:8080/api/v1/test/${id}/solve-test`
				);
                setTestData(response.data.data);
			} catch (error) {
				setError(error);                
			} finally {
				setLoading(false);
			}
		};

		getTest();
	}, [id]);

    const handleOptionChange = (questionIndex, optionValue) => {
		setAnswers(prevAnswers => ({
			...prevAnswers,
			[questionIndex]: optionValue
		}));
	};


    const handleSubmit = async () => {
		try {
			await axios.post(`http://localhost:8080/api/v1/test/${id}/check-test`, {
				answers, id
			});
		} catch (error) {
			setError(error);
		}
	};


	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
    console.log(testData);
    

	return (
		<div className="container">
			<div className="testContainer">
				{testData?.questions.length > 0
					? testData.questions.map((question, qIndex) => (
							<div key={qIndex} className="que">
								<div className="que">{qIndex+1}. {question.question}</div>
								<div className="opt">
									{question.option.map((option, oIndex) => (
										<div key={oIndex}>
											<input
												type="radio"
												id={`option-${qIndex}-${oIndex}`}
												name={`question-${qIndex}`}
												value={option}
                                                checked={answers[qIndex] === option}
                                                onChange={() => handleOptionChange(qIndex, option)}
											/>
											<label
												htmlFor={`option-${qIndex}-${oIndex}`}
											>
												{option}
											</label>
										</div>
									))}
								</div>
							</div>
					  ))
					: "No questions available"}
            <button onClick={handleSubmit}>Submit</button>
			</div>
		</div>
	);
}

export default GiveTest;
