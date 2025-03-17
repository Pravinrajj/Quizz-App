import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import JoinQuiz from './pages/JoinQuiz';
import Quizzes from './pages/QuizList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/join-quiz" element={<JoinQuiz/>}/>
      <Route path="/list-quiz" element={<Quizzes/>}/>
    </Routes>
  );
}

export default App;
