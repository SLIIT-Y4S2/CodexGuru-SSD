"use client";

import { React, createContext, useState } from 'react';

export const ExamsContext = createContext();

export function ExamsProvider({ children }) {
    const [data, setData] = useState([]);


    /* Function to add new exam */
    const createExam = async (exam) => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/exams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(exam),
            });

            if (response.ok) {
                const data = await response.json();

                const newExam = data.exam;

                setData((prevData) => [...prevData, newExam]);

                alert("Exam creation successful");
            }

        } catch (error) {
            console.log("Error : " + error.message);
        }
    };

    /* Function to get all exams */
    const getAllExams = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/exams");
            const data = await response.json();

            setData(data.exams);

        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to get a particular exam */
    const getExam = async (examID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/${examID}`);
            const data = await response.json();

            return await data.exams[0];

        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to update an exam */
    const updateExam = async (examID, updatedExam) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/${examID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(exam),
            });

            const data = await response.json();

            setData((prevData) => {
                const index = prevData.findIndex((item) => item.id === updatedExam.id);
                if (index !== -1) {
                    prevData[index] = updatedExam;
                }
                return [...prevData];
            });
        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to update an exam's status */
    const updateExamStatus = async (examID, updatedExam, examStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/${examID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ examStatus: examStatus }),
            });

            const data = await response.json();

            setData((prevData) => {
                const index = prevData.findIndex((item) => item.id === updatedExam.id);
                if (index !== -1) {
                    prevData[index] = updatedExam;
                }
                return [...prevData];
            });
        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to delete an exam */
    const deleteExam = async (examID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/${examID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setData((prevData) => prevData.filter((item) => item.id !== examID));

        } catch (error) {
            console.error("Error : " + error.message);
        }
    };


    return (
        <ExamsContext.Provider value={{ data, createExam, getAllExams, getExam, updateExam, updateExamStatus, deleteExam }}>
            {children}
        </ExamsContext.Provider>
    );
}

