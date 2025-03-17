import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// function Dashboard() {
//   const navigate = useNavigate();

//   return (
//     <div className="dashboard">
//       <h2>Welcome to Quiz App</h2>
//       <div className="options">
//         <button className="btn" onClick={() => navigate('/create-quiz')}>
//           Create a Quiz
//         </button>
//         <button className="btn" onClick={() => navigate('/join-quiz')}>
//           Join a Quiz
//         </button>
//         <button className="btn" onClick={() => navigate('/list-quiz')}>
//           List Quiz
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



const Dashboard = () => {
    // Handlers for button clicks
    const navigate = useNavigate();
    const startQuiz = () => {
        alert('Starting quiz...');
    };

    const viewCategories = () => {
        alert('Navigating to categories...');
    };

    const viewLeaderboard = () => {
        alert('Loading leaderboard...');
    };

    const viewProfile = () => {
        alert('Opening profile...');
    };

    const viewSettings = () => {
        alert('Accessing settings...');
    };

    return (
        <div>
            <div className="header">
                <h1>Quiz 26 Dashboard</h1>
            </div>

            <div className="container">
                <div className="card">
                    <div className="icon">
                        <i className="fa-solid fa-play"></i>
                    </div>
                    <h3>Create Quiz</h3>
                    <p>Begin a new quiz to test your knowledge on various topics.</p>
                    <button onClick={() => navigate('/create-quiz')}>Start</button>
                </div>

                <div className="card">
                    <div className="icon">
                        <i className="fa-solid fa-list"></i>
                    </div>
                    <h3>List Quiz</h3>
                    <p>Explore quizzes sorted by different categories and difficulty levels.</p>
                    <button onClick={() => navigate('/list-quiz')}>Explore</button>
                </div>

                <div className="card">
                    <div className="icon">
                        <i className="fa-solid fa-chart-bar"></i>
                    </div>
                    <h3>Join Quiz</h3>
                    <p>Check your ranking and see how you compare to others.</p>
                    <button onClick={() => navigate('/join-quiz')}>View</button>
                </div>

                <div className="card">
                    <div className="icon">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <h3>Profile</h3>
                    <p>Manage your profile and track your quiz history.</p>
                    <button onClick={viewProfile}>Manage</button>
                </div>

                <div className="card">
                    <div className="icon">
                        <i className="fa-solid fa-cogs"></i>
                    </div>
                    <h3>Settings</h3>
                    <p>Customize your quiz experience and preferences.</p>
                    <button onClick={viewSettings}>Settings</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
