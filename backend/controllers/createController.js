const { Quiz} = require('../models/model');


exports.createQuiz= async (req, res) => {
    try {
        const { title, category } = req.body;
    
        const quiz = new Quiz({ title, category });
        const savedQuiz = await quiz.save();
        console.log(savedQuiz);
        res.status(201).json({ message: 'Quiz created successfully!', quizId: savedQuiz._id });
      } catch (error) {
        res.status(500).json({ message: 'Error creating quiz', error });
      }
}