const { Question} = require('../models/model');

exports.fetchQuestions= async (req, res) => {
    try {
      const { quizId } = req.params;
  
      // Fetch questions for the given quizId
      const questions = await Question.find({ quizId }).select('-quizId');
      if (!questions.length) {
        return res.status(404).json({ message: 'No questions found for the given quiz ID' });
      }
  
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching questions', error });
    }
  }