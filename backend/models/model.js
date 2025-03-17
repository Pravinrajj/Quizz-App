const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type : String, required : true},
    userId: {type : String}, //seq: {type: Number,default: 100},
    password: {type : String, required:true},
    email: {type : String, unique:true, required : true},
    time: {type : Date, default : Date.now},
    photo: {type : String}
})

const quizSchema = new Schema({
    title: {type : String, required : true, unique : true},
    category: {type : String, required : true},
    date: {type : Date, default : Date.now},
    quizId: {type : String},
    // createdBy: {type : String, required : true, ref: 'User'},
})

const questionSchema = new Schema({
    qText: {type : String, required : true},
    type: {type : String, required : true},
    qId: {type : String},
    quizId: {type : Schema.Types.ObjectId, required : true, ref: 'Quiz'},
    option: [{
        optText: {type : String, required : true},
        isCorrect: {type : Boolean, required : true} 
    }]
})

const attemptSchema = new Schema({
    // userId: {type : Schema.Types.ObjectId, required : true, ref: 'User'},
    quizId: {type : Schema.Types.ObjectId, required : true, ref: 'Quiz'},
    attemptId: {type : String},
    date: {type : Date, default : Date.now},
    score: {type : Number, default : 0, required : true},
    answers: [{
        ques:{type : Schema.Types.ObjectId, required : true, ref: 'Question'},
        ans:{type : String, required : true}
}]  
})

// userSchema.index({ userId: 1 }, { unique: true });
// quizSchema.index({ quizId: 1 }, { unique: true});
// questionSchema.index({ qId: 1 }, {unique: true});
// attemptSchema.index({ attemptId:1 }, {unique: true});

const User = mongoose.model('User', userSchema);
const Quiz = mongoose.model('Quiz', quizSchema);
const Question = mongoose.model('Question', questionSchema);
const Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = { User, Quiz, Question, Attempt };         