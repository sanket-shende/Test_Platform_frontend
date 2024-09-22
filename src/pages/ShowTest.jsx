import './ShowTest.css'
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";


function ShowTest() {

	const { id } = useParams();
    const [testData, setTestData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

    useEffect(() => {
		const getTest = async () => {
			try {
				const response = await axios.post(
					`/api/v1/test/${id}/show-test`
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

    if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="showTest">
            <div className="header">
                <h1 className="title">{testData.title}</h1>
                <p className="description">{testData.description}</p>
            </div>
            <div className="details">
                <div className="detail-item">
                    <strong>Validity:</strong> <span>{testData.validity}</span>
                </div>
                <div className="detail-item">
                    <strong>Status:</strong> <span>{testData.status}</span>
                </div>
            </div>

            <div className="instructions">
                <h2>Instructions</h2>
                <ol>
                    <li>Read each question carefully.</li>
                    <li>Choose the best answer from the options provided.</li>
                    <li>You have [X] minutes to complete the test.</li>
                    <li>Navigate through questions using the "Next" and "Previous" buttons.</li>
                    <li>Skip questions if unsure, and return to them later.</li>
                    <li>Complete the test on your own, without external help.</li>
                    <li>Submit your test once all questions are answered.</li>
                    <li>If you encounter technical issues, contact @SANKET.</li>
                    <li>Provide feedback after completing the test to help us improve.</li>
                </ol>
            </div>

            <div className="terms">
                <h2>Terms and Conditions</h2>
                <ul>
                    <li><strong>Acceptance of Terms:</strong> By using TEST_PLATFORM, you agree to these terms.</li>
                    <li><strong>User Responsibilities:</strong> Provide accurate information and avoid prohibited conduct.</li>
                    <li><strong>Test Administration:</strong> Follow the test's integrity and time limits.</li>
                    <li><strong>Privacy Policy:</strong> Your data will be used as described in our Privacy Policy.</li>
                    <li><strong>Intellectual Property:</strong> All content is owned by TEST_PLATFORM.</li>
                    <li><strong>Limitation of Liability:</strong> The App is provided as-is; we are not liable for any damages.</li>
                    <li><strong>Modifications:</strong> We may change these terms; continued use implies acceptance of changes.</li>
                    <li><strong>Governing Law:</strong> These terms are governed by INDIA MAHARASHTRA laws.</li>
                    <li><strong>Contact Information:</strong> For questions, contact @SANKET.</li>
                </ul>
                <div className='tac'>
                    <input type="checkbox" name="" id="" /><strong> I read and understand all the above instructions</strong>
                </div>
            </div>

            <div className='btn-show'>
                <Link to={`/${id}/solve`}>
                    <button>Start</button>
                </Link>
            </div>
        </div>
    





        
    );

	// return (
	// 		<div className="showTest">
	// 			<div className="title">{testData.title}</div>
	// 			<div className="description">{testData.description}</div>
	// 			<div className="validity">Validity <span>{testData.validity}</span> </div>
	// 			<div className="status">Status <span>{testData.status}</span> </div>
	// 		</div>
	// );
}

export default ShowTest;
