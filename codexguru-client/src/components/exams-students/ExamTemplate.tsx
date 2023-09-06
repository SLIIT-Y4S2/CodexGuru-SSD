"use client";
// src/components/Quiz.js
import React, { useState, useEffect, useContext } from "react";
import { quizData } from "./QuizData";

function ExamTemplate() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10); // 5-minute timer in seconds
  const [userAnswers, setUserAnswers] = useState(
    new Array(quizData.length).fill(null)
  );
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null); // Track selected choice

  // Function to handle user's answer selection
  const handleAnswerSelect = (selectedAnswer) => {
    setSelectedChoice(selectedAnswer);
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      return newAnswers;
    });
  };

  // Function to move to the next question
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(null); // Clear selected choice when moving to the next question
    } else {
      setQuizCompleted(true);
    }
  };

  // Function to calculate the score
  const calculateScore = () => {
    console.log("FINISH CLICKED");
    let correctAnswers = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (userAnswers[i] == quizData[i].correctAnswer) {
        correctAnswers++;
      }
    }
    setScore(correctAnswers);

    setQuizCompleted(true);
  };

  // Function to format time as "mm:ss"
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0 && !quizCompleted) {
        setTime(time - 1);
      } else {
        clearInterval(timer);
        if (!quizCompleted) {
          calculateScore(); // Calculate the score if time runs out
          setQuizCompleted(true); // Finish the quiz if time runs out
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time, quizCompleted]);

  if (quizCompleted) {
    return (
      <div className="quiz">
        <h1>Quiz Completed!</h1>
        <p>
          Your Score: {score}/{quizData.length}
        </p>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz">
      {/* <h1>Quiz App</h1> */}
      <div className="timer">Time Remaining: {formatTime(time)}</div>
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.choices.map((choice, index) => (
          <li key={index}>
            <input
              type="radio"
              id={`choice-${index}`}
              name="choices"
              value={choice}
              onChange={() => handleAnswerSelect(choice)}
              checked={selectedChoice === choice}
            />
            <label htmlFor={`choice-${index}`}>{choice}</label>
          </li>
        ))}
      </ul>
      {currentQuestionIndex < quizData.length - 1 ? (
        <button onClick={moveToNextQuestion}>Next</button>
      ) : (
        <>
          <button onClick={calculateScore}>Finish</button>
        </>
      )}
    </div>
  );
}

export default ExamTemplate;
