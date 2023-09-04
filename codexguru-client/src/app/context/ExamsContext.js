import { React, createContext, useContext, useState, useEffect } from 'react';

const initialState = {
    data: []
};

export const ExamsContext = createContext(initialState);

export function MyExamsProvider({ children }) {
    const [data, setData] = useState(initialState);

    useEffect(() => {
        // Fetch data from database when the component mounts
        fetchData();
    }, []);


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

            const data = await response.json();

            const newExam = data.exam;

            setData((prevData) => [...prevData, newExam]);

        } catch (error) {
            console.log("Error : " + error.message);
        }
    };

    /* Function to get all exams */
    const getAllExams = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/exams");
            const data = await response.json();

            const allExams = data.exams;

            setData(allExams);
        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to get a particular exam */
    const getExam = async (examID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/${examID}`);
            const data = await response.json();

            const exam = await data.exams[0];

            return await exam;
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

    const fetchData = async () => {
        try {
            // const response = await fetch("http://localhost:5000/api/v1/exams");
            // const data = await response.json();
            // setData(data);
            await getAllExams();
        } catch (error) {
            console.log('Error fetching data:' + error.message);
        }
    };

    return (
        <ExamsContext.Provider value={{ data, createExam, getAllExams, getExam, updateExam, deleteExam }}>
            {children}
        </ExamsContext.Provider>
    );
}

// export function useExamsContext() {
//     return useContext(ExamsContext);
// }
