const { Question,Attempt} = require('../models/model');


exports.attemptDetails= async (req, res) => {
    try {
      const { userId, quizId, answers } = req.body;
    // const {  quizId, answers } = req.body;
      const questions = await Question.find({ quizId });
      if (!questions.length) {
        return res.status(404).json({ message: 'No questions found for the quiz' });
      }
  
      // Calculate score
      let score = 0;
      for (const answer of answers) {
        const question = questions.find(q => q._id.toString() === answer.ques);
        if (question) {
          const correctOption = question.option.find(opt => opt.isCorrect);
          if (correctOption && correctOption.optText === answer.ans) {
            score++;
          }
        }
      }
      // Save attempt
      console.log(score);
      const attempt = new Attempt({
        // userId,
        quizId,
        answers,
        score,
      });
      await attempt.save();
      res.status(201).json({ message: 'Attempt saved successfully!', score });
    } catch (error) {
      res.status(500).json({ message: 'Error saving attempt', error });
    }
  }