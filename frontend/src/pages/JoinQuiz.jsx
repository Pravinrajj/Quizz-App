import React, { useState } from 'react';
import axios from 'axios';
import './JoinQuiz.css';

function JoinQuiz({ userId }) {
  const [quizId, setQuizId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/quizzes/questions/${quizId}`);
      setQuestions(response.data);
      setAnswers({});
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      alert('Quiz not found. Please check the quiz ID.');
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const submitQuiz = async () => {
    const attemptData = {
      userId,
      quizId,
      answers: Object.entries(answers).map(([ques, ans]) => ({ ques, ans })),
    };
    console.log(attemptData);

    try {
      const response = await axios.post('http://localhost:5000/api/quizzes/attempt', attemptData);
    //   console.log(response.data.score);
      
      setScore(response.data.score);
      alert(`Quiz submitted successfully! Your score: ${response.data.score}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz.');
    }
  };

  return (
    <div className="join-quiz">
      <h2>Join a Quiz</h2>

      {/* Step 1: Enter Quiz ID */}
      {!questions.length ? (
        <div className="form-group">
          <label>Enter Quiz ID:</label>
          <input
            type="text"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            required
          />
          <button onClick={fetchQuiz}>Join Quiz</button>
        </div>
      ) : (
        <>
          {/* Step 2: Display Questions */}
          <h3>Quiz Questions</h3>
          <form>
            {questions.map((question) => (
              <div key={question._id} className="question-block">
                <p>
                  <strong>{question.qText}</strong>
                </p>
                {question.option.map((opt, index) => (
                  <div key={index} className="form-group">
                    <label>
                      <input
                        type="radio"
                        name={question._id}
                        value={opt.optText}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      />
                      {opt.optText}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </form>

          <button type="button" onClick={submitQuiz}>Submit Quiz</button>

          {/* Step 3: Display Score */}
          {score !== null && <h4>Your Score: {score}</h4>}
        </>
      )}
    </div>
  );
}

export default JoinQuiz;
