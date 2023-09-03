/**
 * QuestionController implementation
 */

import Question from "../models/Question.js";

/* Function to get all questions */
const getQuestions = async (req, res) => {
    try {
        const allQuestions = await Question.find();

        if (allQuestions.length === 0) {
            res.status(201).json({
                message: "No questions found",
                questions: allQuestions
            });
        } else if (allQuestions.length !== 0) {
            res.status(201).json({
                message: "Questions found",
                questions: allQuestions
            });
        } else {
            res.status(400);
        }

    } catch (error) {
        console.log(error.message);
    }
};

/* Function to get a single question */
const getQuestion = async (req, res) => {

    try {
        const question = await Question.find({ id: req.params.id });

        if (question) {
            res.status(200).json({
                message: "Question found",
                question: question
            });
        } else {
            res.status(204).json({
                message: "Question not found",
            });
        }

    } catch (error) {
        console.log(error.message);
    }

};

/* Function to add a new question */
const addQuestion = async (req, res) => {

    try {
        const { examCode, content, option1, option2, option3, option4, answer } = req.body;

        // Variable to hold the new id
        let newID;

        // Variable to hold the last document in the collection
        let lastDoc = await Question.find().limit(1).sort({ $natural: -1 });

        if (lastDoc.length !== 0) {
            // Variable to hold the id of the last document in the collection
            let lastDocID = await lastDoc[0].id;

            // Increment the id by 1
            newID = lastDocID + 1;
        } else {
            // Assign 0 otherwise
            newID = 0;
        }

        const newQuestion = await new Question({
            id: newID,
            examCode,
            content,
            option1,
            option2,
            option3,
            option4,
            answer
        }).save();

        if (newQuestion) {
            res.status(201).json({
                message: "Question added successfully",
                question: newQuestion
            });
        } else {
            res.status(400).json({
                message: "Failed to add question"
            });
        }

    } catch (error) {
        console.log(error.message);
    }
}

/* Function to update a question */
const updateQuestion = async (req, res) => {
    try {
        const question = await Question.find({ id: req.params.id });

        if (question) {
            const updatedQuestion = await Question.findOneAndUpdate(
                {
                    id: req.params.id
                },
                {
                    $set: {
                        examCode: req.body.examCode,
                        content: req.body.content,
                        imageURL: "",
                        option1: req.body.option1,
                        option2: req.body.option2,
                        option3: req.body.option3,
                        option4: req.body.option4,
                        answer: req.body.answer
                    }
                },
                {
                    new: true
                }
            );

            if (updatedQuestion) {
                res.status(200).json({
                    message: "Question updated successfully",
                    question: updatedQuestion
                });
            } else {
                res.status(400).json({
                    message: "Question not found"
                });
            }
        } else {
            res.status(400).json({
                message: "Failed to update question"
            });
        }


    } catch (error) {
        console.log(error.message);
    }

};

/* Function to delete a question */
const deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findOneAndDelete({
            id: req.params.id,
        });

        if (deletedQuestion) {
            res.status(200).json({
                message: "Question deleted successfully"
            });;
        } else {
            res.status(400).json({
                message: "Failed to delete question",
                question: deletedQuestion
            });
        }

    } catch (error) {
        console.log(error.message);
    }
};

const questionController = {
    getQuestions,
    getQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion
};



export default questionController;