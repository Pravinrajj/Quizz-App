import React, { useEffect, useState } from 'react';
import './CreateQuiz.css';
import axios from 'axios';


function CreateQuiz() {
  const [quiz, setQuiz] = useState({
    title: '',
    category: '',
    quizId: '',  // To store the created quiz ID
    questions: []
  });
  
  const [currentQuestion, setCurrentQuestion] = useState({
    qText: '',
    type: 'multiple choice',
    option: [
      { optText: '', isCorrect: false },
      { optText: '', isCorrect: false },
      { optText: '', isCorrect: false },
      { optText: '', isCorrect: false }
    ]
  });

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleQuestionChange = (key, value) => {
    const updatedQuestion = { ...currentQuestion, [key]: value };

    // Dynamically adjust the number of options based on question type
    if (key === 'type') {
      if (value === 'multiple choice') {
        updatedQuestion.option = [
          { optText: '', isCorrect: false },
          { optText: '', isCorrect: false },
          { optText: '', isCorrect: false },
          { optText: '', isCorrect: false }
        ];
      } else if (value === 'true or false') {
        updatedQuestion.option = [
          { optText: 'True', isCorrect: false },
          { optText: 'False', isCorrect: false }
        ];
      }
    }

    setCurrentQuestion(updatedQuestion);
  };

  
  const handleOptionChange = (optIndex, key, value) => {
      const updatedOption = [...currentQuestion.option];
      updatedOption[optIndex][key] = value;
      setCurrentQuestion({ ...currentQuestion, option: updatedOption });
    };
    
    // Step 1: Submit Quiz Details and create quiz
    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        if (!quiz.title.trim() || !quiz.category.trim()) {
            alert('Please fill in the quiz title and category.');
            return;
        }
        
        try {
            console.log(quiz);
            const response = await axios.post('http://localhost:5000/api/quizzes/create',quiz);
        	// console.log(response);
            if (response) {
                const data = response.data;
                // console.log(data);
                setQuiz({
                    ...quiz,
                    quizId: data.quizId // Save the quizId for reference when adding questions
                });
                alert('Quiz created successfully!'+data.quizId);
            } else {
                const data = await response.json();
                alert(data.message || 'Error creating quiz');
            }
        } catch (error) {
            console.error('Error creating quiz:', error);
            alert('Error creating quiz.');
        }
    };
    
    useEffect(()=>{
      handleQuizSubmit;
    },[]);

    // Step 2: Add Question and store it in the Question collection
    const addQuestion = async () => {
        if (!currentQuestion.qText.trim()) {
      alert('Please enter a question text before adding.');
      return;
    }

    if (!quiz.quizId) {
      alert('Please create a quiz first.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/quizzes/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentQuestion, quizId: quiz.quizId })
      });

      if (response.ok) {
        alert('Question added successfully!');
        setQuiz({
          ...quiz,
          questions: [...quiz.questions, currentQuestion] // Save question to quiz state
        });

        // Reset current question for new entry
        setCurrentQuestion({
          qText: '',
          type: 'multiple choice',
          option: [
            { optText: '', isCorrect: false },
            { optText: '', isCorrect: false },
            { optText: '', isCorrect: false },
            { optText: '', isCorrect: false }
          ]
        });
      } else {
        const data = await response.json();
        alert(data.message || 'Error saving question');
      }
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Error saving question.');
    }
  };

  // Step 3: Submit all questions and finish quiz creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quiz.questions.length === 0) {
      alert('Please add at least one question to the quiz.');
      return;
    }

    alert('Quiz submitted successfully!');
    // Reset quiz and question data after submission
    setQuiz({
      title: '',
      category: '',
      quizId: '',
      questions: []
    });
  };

  return (
    <div className="create-quiz">
      <h2>Create a Quiz</h2>
      {/* Step 1: Quiz Details */}
      {!quiz.quizId ? (
        <form onSubmit={handleQuizSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={quiz.title}
              onChange={handleQuizChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={quiz.category}
              onChange={handleQuizChange}
              required
            />
          </div>
          <button type="submit">Create Quiz</button>
        </form>
      ) : (
        <>
          {/* Step 2: Add Questions */}
          <h3>Add Questions</h3>
          <div className="question-block">
            <div className="form-group">
              <label>Question Text:</label>
              <input
                type="text"
                value={currentQuestion.qText}
                onChange={(e) => handleQuestionChange('qText', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <select
                value={currentQuestion.type}
                onChange={(e) => handleQuestionChange('type', e.target.value)}
              >
                <option value="multiple choice">Multiple Choice</option>
                <option value="true or false">True or False</option>
              </select>
            </div>
            <div className="options">
              <h4>Options</h4>
              {currentQuestion.option.map((option, optIndex) => (
                <div key={optIndex} className="form-group">
                  <input
                    type="text"
                    placeholder="Option Text"
                    value={option.optText}
                    onChange={(e) => handleOptionChange(optIndex, 'optText', e.target.value)}
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={(e) => handleOptionChange(optIndex, 'isCorrect', e.target.checked)}
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>
            <button type="button" onClick={addQuestion}>Save Question</button>
          </div>

          <h3>Saved Questions</h3>
          {quiz.questions.length > 0 ? (
            quiz.questions.map((question, index) => (
              <div key={index} className="saved-question">
                <p>
                  <strong>Q{index + 1}:</strong> {question.qText} ({question.type})
                </p>
                <ul>
                  {question.option.map((option, idx) => (
                    <li key={idx}>
                      {option.optText} {option.isCorrect ? '(Correct)' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No questions added yet.</p>
          )}

          {/* Step 3: Submit Quiz */}
          <button type="button" onClick={handleSubmit}>Submit Quiz</button>
        </>
      )}
    </div>
  );
}

export default CreateQuiz;
