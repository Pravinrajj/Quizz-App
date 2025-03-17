const express = require('express');
const router = express.Router();
// const { Quiz,Attempt, Question } = require('../models/model');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Route to create a quiz
// router.post('/create', async (req, res) => {
//     try {
//         // console.log(req)
//         const { title, category } = req.body;
    
//         const quiz = new Quiz({ title, category });
//         const savedQuiz = await quiz.save();
//         console.log(savedQuiz);
//         res.status(201).json({ message: 'Quiz created successfully!', quizId: savedQuiz._id });
//       } catch (error) {
//         res.status(500).json({ message: 'Error creating quiz', error });
//       }  
// });


// Route to save a question
// router.post('/questions', async (req, res) => {
//   try {
//     const { qText, type, option, quizId } = req.body;
//     console.log(option)
//     const question = new Question({ qText, type, option, quizId });
//     await question.save();

//     res.status(201).json({ message: 'Question saved successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving question', error });
//   }
// });

//2

// Route to fetch quiz questions
// router.get('/questions/:quizId', async (req, res) => {
//     try {
//       const { quizId } = req.params;
  
//       // Fetch questions for the given quizId
//       const questions = await Question.find({ quizId }).select('-quizId');
//       if (!questions.length) {
//         return res.status(404).json({ message: 'No questions found for the given quiz ID' });
//       }
  
//       res.status(200).json(questions);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching questions', error });
//     }
//   });

  
  // Route to save quiz attempt
// router.post('/attempt', async (req, res) => {
//     try {
//     //   const { userId, quizId, answers } = req.body;
//     const {  quizId, answers } = req.body;
//          console.log(req.body)
//       const questions = await Question.find({ quizId });
//       console.log(questions);
//     //   if (!questions.length) {
//     //     return res.status(404).json({ message: 'No questions found for the quiz' });
//     //   }
  
//       // Calculate score
//       let score = 0;
//       for (const answer of answers) {
//         const question = questions.find(q => q._id.toString() === answer.ques);
//         if (question) {
//           const correctOption = question.option.find(opt => opt.isCorrect);
//           if (correctOption && correctOption.optText === answer.ans) {
//             score++;
//           }
//         }
//       }
//       console.log(score)
//       // Save attempt
//       const attempt = new Attempt({
//         // userId,
//         quizId,
//         answers,
//         score,
//       });
//       console.log(attempt);
      
//       await attempt.save();

//     //   console.log(saved);
//       res.status(201).json({ message: 'Attempt saved successfully!', score });
//     } catch (error) {
//       res.status(500).json({ message: 'Error saving attempt', error });
//     }
//   });
  





const {createQuiz}=require("../controllers/createController")
router.post('/create', createQuiz);

const {createQuestion}=require("../controllers/questionsController")
router.post('/questions', createQuestion);
  

const {fetchQuestions}=require("../controllers/fetchQuestions")
router.get('/questions/:quizId', fetchQuestions);
  
const {attemptDetails}=require("../controllers/attemptController")
router.post('/attempt', attemptDetails);


const { Quiz,Question } = require('../models/model');

// Fetch all quizzes
router.get('/list', async (req, res) => {
    try {
      const quizzes = await Quiz.find(); // Fetch all quizzes
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching quizzes', error });
    }
  });

  
  // Update a quiz by ID
router.put('/:id', async (req, res) => {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //     return res.status(400).json({ message: 'Invalid quiz ID' });
    //   }
    try {
        const { title, category } = req.body;
        console.log(req.params.id);
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            // {_id:req.params.id},
            { title, category },
            { new: true }
        );
        console.log(5)
        console.log(updatedQuiz);
        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Error updating quiz', error });
    }
});

// Delete a quiz by ID
router.delete('/:id', async (req, res) => {
    try {
        // const deleteQuestion=await Question.findByIdAndDelete(req.params.id);
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        await Question.deleteMany({ quizId: req.params.id });
        
        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quiz', error });
    }
});

router.get('/:quizId', async (req, res) => {
    try {
      const questions = await Question.find({ quizId: req.params.quizId });
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching questions', error });
    }
  });
//   router.put('/questions/:questionId', async (req, res) => {
//     try {
//         console.log(req.body)
//       const { qText, option } = req.body;
      
//       const updatedQuestion = await Question.findByIdAndUpdate(
//         req.params.questionId,
//         { qText, option },
//         { new: true }
//       );
//       if (!updatedQuestion) {
//         return res.status(404).json({ message: 'Question not found' });
//       }
//       res.status(200).json(updatedQuestion);
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating question', error });
//     }
//   });
router.put('/questions/:questionId', async (req, res) => {
    try {
        const { qText, option } = req.body;

        // Validate question text
        if (!qText || typeof qText !== 'string' || qText.trim() === '') {
            return res.status(400).json({ message: 'Invalid or missing question text (qText).' });
        }

        // Validate options array
        if (!Array.isArray(option) || option.length === 0) {
            return res.status(400).json({ message: 'Options must be a non-empty array.' });
        }

        for (let i = 0; i < option.length; i++) {
            const opt = option[i];
            if (!opt.optText || typeof opt.optText !== 'string' || opt.optText.trim() === '') {
                return res.status(400).json({ message: `Option at index ${i} is missing or invalid (optText).` });
            }
            if (typeof opt.isCorrect !== 'boolean') {
                return res.status(400).json({ message: `Option at index ${i} is missing or invalid (isCorrect).` });
            }
        }

        // Update the question in the database
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.questionId,
            { qText, option },
            { new: true, runValidators: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ message: 'Error updating question', error });
    }
});

//   router.delete('/questions/:questionId', async (req, res) => {
//     try {
//       const deletedQuestion = await Question.findByIdAndDelete(req.params.questionId);
//       if (!deletedQuestion) {
//         return res.status(404).json({ message: 'Question not found' });
//       }
//       res.status(200).json({ message: 'Question deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error deleting question', error });
//     }
//   });
router.delete('/questions/:questionId', async (req, res) => {
    try {
      const question = await Question.findById(req.params.questionId);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Delete the question
      await Question.findByIdAndDelete(req.params.questionId);
  
      // Check if there are any questions left for the same quiz
      const remainingQuestions = await Question.find({ quizId: question.quizId });
  
      if (remainingQuestions.length === 0) {
        // Delete the quiz if no questions are left
        const deletedQuiz = await Quiz.findByIdAndDelete(question.quizId);
        if (!deletedQuiz) {
          return res.status(404).json({ message: 'Quiz not found' });
        }
        return res.status(200).json({ message: 'Question and its associated quiz deleted successfully' });
      }
  
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting question or quiz', error });
    }
  });

module.exports = router;
