import { useState } from "react";
import "./CreateQue.css";
import { Question } from "../../../backEnd/src/models/question.model.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const CreateQue = () => {
    const testId = Cookies.get("TestId");
    const navigate = useNavigate()
	const [queType, setQueType] = useState("MCQ");
	const [mark, setMark] = useState(0);
	const [questions, setQuestions] = useState([{ que: "", opt: [], mark: 1, ans: "" }]);

	const handleChange = (e, qIndex, type, oIndex) => {
		const { name, value } = e.target;
        
		setQuestions((prevQuestions) => {
			const newQuestions = [...prevQuestions];
			if (type === "question") {
				newQuestions[qIndex].que = value;
			} else if (type === "option") {
				newQuestions[qIndex].opt[oIndex] = value;
			} else if (type === "indMark") {
				newQuestions[qIndex].mark = value;
			} else if (type === "ans") {
                console.log(value);
                
				newQuestions[qIndex].ans = value;
			}
			return newQuestions;
		});
		if (e.target.name == "queType") {
			setQueType(value);
		}
		if (e.target.name == "mark") {
			setMark(value);
		}
	};

	const handleAddQuestion = () => {
		setQuestions((prevQuestions) => [
			...prevQuestions,
			{ que: "", opt: [] },
		]);
	};

	// Add a new option to a specific question
	const handleAddOption = (oIndex) => {
		setQuestions((prevQuestions) => {
			const newQuestions = [...prevQuestions];
			newQuestions[oIndex].opt.push("");
			return newQuestions;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:8080/api/v1/test/subtest-create",
				{ questions, queType, mark, testId }
			);
            Cookies.remove("TestId");
            
			navigate("/")
		} catch (error) {
			throw error;
		}
	};

	return (
		<div className="test-container">
			<form onSubmit={handleSubmit}>
				<div className="que-topbar">
					<select
						name="queType"
						id=""
						className="que-type"
						onChange={handleChange}
						value={queType}
					>
						<option value="MCQ">Multiple chioce que</option>
						<option value="FITB">Fill in the blanks</option>
						<option value="TOF">True or false</option>
						<option value="SA">Short answer</option>
					</select>
					<input
						name="mark"
						type="number"
						min={0}
						value={mark}
						className="mark"
						onChange={handleChange}
					/>
				</div>
				{questions.map((question, qIndex) => (
					<div key={qIndex} className="main-que">
						<div className="ind-que">
							<div className="quetion">
								<div className="que-no">{qIndex + 1}</div>
								<textarea
									className="question"
									name="question"
									value={question.que}
									onChange={(e) =>
										handleChange(e, qIndex, "question")
									}
									placeholder="Enter Question"
								/>
								<input type="number" className="ind-mark" name="indMark" value={questions.mark} onChange={(e) =>
										handleChange(e, qIndex, "indMark")
									} />
							</div>
							<div className="options">
								{question.opt.map((option, oIndex) => (
									<div key={oIndex} className="option">
										<input
											type="radio"
                                            name={`question-${qIndex}`}
											value={option}
                                            checked={question.ans === option}
											onChange={(e) =>
                                                handleChange(e, qIndex, "ans")
                                            }
										/>
										<input
											type="text"
											className="opt"
											placeholder="Enter Option"
											value={option}
											onChange={(e) =>
												handleChange(
													e,
													qIndex,
													"option",
													oIndex
												)
											}
										/>
									</div>
								))}
								<button
									type="button"
									id="addOption"
									onClick={() => handleAddOption(qIndex)}
								>
									Add Option
								</button>
							</div>
						</div>
					</div>
				))}
				<button type="button" onClick={handleAddQuestion}>
					Add Question
				</button>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default CreateQue;
