// // src/components/QuizList.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './QuizList.css'; // CSS for styling

// const QuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);

//   // Fetch quizzes from the backend
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quizzes/list'); // Adjust API URL
//         // console.log(response.data);
//         setQuizzes(response.data);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//       }
//     };
//     fetchQuizzes();
//   }, []);

//   return (
//     <div className="quiz-list-container">
//       <h1>Quizzes</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Category</th>
//             <th>Date Created</th>
//           </tr>
//         </thead>
//         <tbody>
//           {quizzes.map((quiz) => (
//             <tr key={quiz._id}>
//               <td>{quiz.title}</td>
//               <td>{quiz.category}</td>
//               <td>{new Date(quiz.date).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuizList;

//2

// src/components/QuizList.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './QuizList.css'; // CSS for styling

// const QuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [editingQuiz, setEditingQuiz] = useState(null);
//   const [updatedTitle, setUpdatedTitle] = useState('');
//   const [updatedCategory, setUpdatedCategory] = useState('');

//   // Fetch quizzes from the backend
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quizzes/list'); // Adjust API URL
//         setQuizzes(response.data);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//       }
//     };
//     fetchQuizzes();
//   }, []);

//   // Handle deleting a quiz
//   const handleDelete = async (quizId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/quizzes/${quizId}`);
//       setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId)); // Remove deleted quiz from state
//     } catch (error) {
//       console.error('Error deleting quiz:', error);
//     }
//   };

//   // Handle starting the editing process
//   const handleEdit = (quiz) => {
//     setEditingQuiz(quiz._id);
//     setUpdatedTitle(quiz.title);
//     setUpdatedCategory(quiz.category);
//   };

//   // Handle updating a quiz
//   const handleUpdate = async (quizId) => {
//     try {
//       const updatedQuiz = {
//         title: updatedTitle,
//         category: updatedCategory,
//       };
//       await axios.put(`http://localhost:5000/api/quizzes/${quizId}`, updatedQuiz);
//       setQuizzes(quizzes.map((quiz) =>
//         quiz._id === quizId ? { ...quiz, ...updatedQuiz } : quiz
//       ));
//       setEditingQuiz(null); // Stop editing mode
//     } catch (error) {
//       console.error('Error updating quiz:', error);
//     }
//   };

//   return (
//     <div className="quiz-list-container">
//       <h1>Quizzes</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Category</th>
//             <th>Date Created</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {quizzes.map((quiz) => (
//             <tr key={quiz._id}>
//               <td>
//                 {editingQuiz === quiz._id ? (
//                   <input
//                     type="text"
//                     value={updatedTitle}
//                     onChange={(e) => setUpdatedTitle(e.target.value)}
//                   />
//                 ) : (
//                   quiz.title
//                 )}
//               </td>
//               <td>
//                 {editingQuiz === quiz._id ? (
//                   <input
//                     type="text"
//                     value={updatedCategory}
//                     onChange={(e) => setUpdatedCategory(e.target.value)}
//                   />
//                 ) : (
//                   quiz.category
//                 )}
//               </td>
//               <td>{new Date(quiz.date).toLocaleDateString()}</td>
//               <td>
//                 {editingQuiz === quiz._id ? (
//                   <>
//                     <button onClick={() => handleUpdate(quiz._id)}>Save</button>
//                     <button className="cancel" onClick={() => setEditingQuiz(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleEdit(quiz)}>Edit</button>
//                     <button className="delete" onClick={() => handleDelete(quiz._id)}>Delete</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuizList;


//3

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './QuizList.css'; // CSS for styling

// const QuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [editingQuiz, setEditingQuiz] = useState(null);
//   const [updatedTitle, setUpdatedTitle] = useState('');
//   const [updatedCategory, setUpdatedCategory] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [isQuestionEditing, setIsQuestionEditing] = useState(null);
//   const [updatedQuestionText, setUpdatedQuestionText] = useState('');
//   const [updatedOptions, setUpdatedOptions] = useState([]);
//   const [isQuestionListVisible, setIsQuestionListVisible] = useState(false);

//   // Fetch quizzes from the backend
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quizzes/list');
//         setQuizzes(response.data);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//       }
//     };
//     fetchQuizzes();
//   }, []);

//   // Handle deleting a quiz
//   const handleDelete = async (quizId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/quizzes/${quizId}`);
//       setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
//     } catch (error) {
//       console.error('Error deleting quiz:', error);
//     }
//   };

//   // Handle starting the editing process for a quiz
//   const handleEdit = (quiz) => {
//     setEditingQuiz(quiz._id);
//     setUpdatedTitle(quiz.title);
//     setUpdatedCategory(quiz.category);
//   };

//   // Handle updating a quiz
//   const handleUpdate = async (quizId) => {
//     try {
//       const updatedQuiz = {
//         title: updatedTitle,
//         category: updatedCategory,
//       };
//       await axios.put(`http://localhost:5000/api/quizzes/${quizId}`, updatedQuiz);
//       setQuizzes(quizzes.map((quiz) =>
//         quiz._id === quizId ? { ...quiz, ...updatedQuiz } : quiz
//       ));
//       setEditingQuiz(null); // Stop editing mode
//     } catch (error) {
//       console.error('Error updating quiz:', error);
//     }
//   };

//   // Fetch questions for a specific quiz
//   const handleListQuestions = async (quizId) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
//       setQuestions(response.data);
//       setIsQuestionListVisible(true);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

//   // Handle deleting a question
//   const handleDeleteQuestion = async (questionId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/quizzes/questions/${questionId}`);
//       setQuestions(questions.filter((question) => question._id !== questionId));
//     } catch (error) {
//       console.error('Error deleting question:', error);
//     }
//   };

//   // Handle editing a question
//   const handleEditQuestion = (question) => {
//     setIsQuestionEditing(question._id);
//     setUpdatedQuestionText(question.qText);
//     setUpdatedOptions(question.option);
//   };

//   // Handle updating a question
//   const handleUpdateQuestion = async (questionId) => {
//     const updatedQuestion = {
//       qText: updatedQuestionText,
//       option: updatedOptions,
//     };
//     console.log(updatedQuestion)
//     console.log(questionId)
//     try {
//       await axios.put(`http://localhost:5000/api/quizzes/questions/${questionId}`, updatedQuestion);
//       setQuestions(questions.map((question) =>
//         question._id === questionId ? { ...question, ...updatedQuestion } : question
//       ));
//       setIsQuestionEditing(null); // Stop editing question mode
//     } catch (error) {
//       console.error('Error updating question:', error);
//     }
//   };

//   return (
//     <div className="quiz-list-container">
//       <h1>Quizzes</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Category</th>
//             <th>Date Created</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {quizzes.map((quiz) => (
//             <tr key={quiz._id}>
//               <td>
//                 {editingQuiz === quiz._id ? (
//                   <input
//                     type="text"
//                     value={updatedTitle}
//                     onChange={(e) => setUpdatedTitle(e.target.value)}
//                   />
//                 ) : (
//                   quiz.title
//                 )}
//               </td>
//               <td>
//                 {editingQuiz === quiz._id ? (
//                   <input
//                     type="text"
//                     value={updatedCategory}
//                     onChange={(e) => setUpdatedCategory(e.target.value)}
//                   />
//                 ) : (
//                   quiz.category
//                 )}
//               </td>
//               <td>{new Date(quiz.date).toLocaleDateString()}</td>
//               <td>
//                 {editingQuiz === quiz._id ? (
//                   <>
//                     <button onClick={() => handleUpdate(quiz._id)}>Save</button>
//                     <button className="cancel" onClick={() => setEditingQuiz(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleEdit(quiz)}>Edit</button>
//                     <button className="delete" onClick={() => handleDelete(quiz._id)}>Delete</button>
//                     <button onClick={() => handleListQuestions(quiz._id)}>Update Questions</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isQuestionListVisible && (
//         <div className="questions-container">
//           <h2>Questions</h2>
//           <ul>
//             {questions.map((question) => (
//               <li key={question._id}>
//                 {isQuestionEditing === question._id ? (
//                   <div>
//                     <input
//                       type="text"
//                       value={updatedQuestionText}
//                       onChange={(e) => setUpdatedQuestionText(e.target.value)}
//                     />
//                     {/* Add logic for editing options here */}
//                     <button onClick={() => handleUpdateQuestion(question._id)}>Save</button>
//                     <button onClick={() => setIsQuestionEditing(null)}>Cancel</button>
//                   </div>
//                 ) : (
//                   <div>
//                     <p>{question.qText}</p>
//                     <button onClick={() => handleEditQuestion(question)}>Edit</button>
//                     <button className="delete" onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizList;



//4

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizList.css'; // CSS for styling

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isQuestionEditing, setIsQuestionEditing] = useState(null);
  const [updatedQuestion, setUpdatedQuestion] = useState({});
  const [isQuestionListVisible, setIsQuestionListVisible] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes/list');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    try {
      await axios.delete(`http://localhost:5000/api/quizzes/${quizId}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz._id);
    setUpdatedTitle(quiz.title);
    setUpdatedCategory(quiz.category);
  };

  const handleUpdate = async (quizId) => {
    try {
      const updatedQuiz = {
        title: updatedTitle,
        category: updatedCategory,
      };
      await axios.put(`http://localhost:5000/api/quizzes/${quizId}`, updatedQuiz);
      setQuizzes(quizzes.map((quiz) =>
        quiz._id === quizId ? { ...quiz, ...updatedQuiz } : quiz
      ));
      setEditingQuiz(null);
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  const handleListQuestions = async (quizId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
      setQuestions(response.data);
      setIsQuestionListVisible(true);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/quizzes/questions/${questionId}`);
      setQuestions(questions.filter((question) => question._id !== questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleEditQuestion = (question) => {
    setIsQuestionEditing(question._id);
    setUpdatedQuestion({
      qText: question.qText,
      option: [...question.option],
    });
  };

  const handleUpdateQuestionField = (field, value) => {
    setUpdatedQuestion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateOption = (index, field, value) => {
    setUpdatedQuestion((prev) => {
      const updatedOptions = [...prev.option];
      updatedOptions[index] = { ...updatedOptions[index], [field]: value };
      return { ...prev, option: updatedOptions };
    });
  };

  const handleSaveQuestion = async (questionId) => {
    try {
      await axios.put(`http://localhost:5000/api/quizzes/questions/${questionId}`, updatedQuestion);
      setQuestions(questions.map((question) =>
        question._id === questionId ? { ...question, ...updatedQuestion } : question
      ));
      setIsQuestionEditing(null);
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div className="quiz-list-container">
      <h1>Quizzes</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz._id}>
              <td>
                {editingQuiz === quiz._id ? (
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                ) : (
                  quiz.title
                )}
              </td>
              <td>
                {editingQuiz === quiz._id ? (
                  <input
                    type="text"
                    value={updatedCategory}
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                  />
                ) : (
                  quiz.category
                )}
              </td>
              <td>{new Date(quiz.date).toLocaleDateString()}</td>
              <td>
                {editingQuiz === quiz._id ? (
                  <>
                    <button onClick={() => handleUpdate(quiz._id)}>Save</button>
                    <button className="cancel" onClick={() => setEditingQuiz(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(quiz)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(quiz._id)}>Delete</button>
                    <button onClick={() => handleListQuestions(quiz._id)}>Update Questions</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isQuestionListVisible && (
        <div className="questions-container">
          <h2>Questions</h2>
          <ul>
            {questions.map((question) => (
              <li key={question._id}>
                {isQuestionEditing === question._id ? (
                  <div>
                    <input
                      type="text"
                      value={updatedQuestion.qText}
                      onChange={(e) => handleUpdateQuestionField('qText', e.target.value)}
                    />
                    {updatedQuestion.option.map((opt, index) => (
                      <div key={index} className="option-edit">
                        <input
                          type="text"
                          value={opt.optText}
                          onChange={(e) => handleUpdateOption(index, 'optText', e.target.value)}
                        />
                        <label>
                          <input
                            type="checkbox"
                            checked={opt.isCorrect}
                            onChange={(e) => handleUpdateOption(index, 'isCorrect', e.target.checked)}
                          />
                          Correct
                        </label>
                      </div>
                    ))}
                    <button onClick={() => handleSaveQuestion(question._id)}>Save</button>
                    <button onClick={() => setIsQuestionEditing(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <p>{question.qText}</p>
                    <button onClick={() => handleEditQuestion(question)}>Edit</button>
                    <button className="delete" onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizList;

