const { Question} = require('../models/model');


exports.createQuestion= async (req, res) => {
    try {
      const { qText, type, option, quizId } = req.body;
      console.log(option)
      const question = new Question({ qText, type, option, quizId });
      await question.save();
  
      res.status(201).json({ message: 'Question saved successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving question', error });
    }
  }