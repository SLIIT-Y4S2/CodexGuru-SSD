// Function to verify password when attempting an exam
export function verifyPassword(actualPwd, enteredPassword) {
    return actualPwd === enteredPassword;
}

// Function to validate when adding questions
export function validateQuesForm(quesObjs) {
    const questionsArray = quesObjs.items;

    // Monitor form status
    let formStatus = true;

    for (const question of questionsArray) {
        if (question.hasOwnProperty("list") === false) {
            formStatus = false;
        }
    }

    return formStatus;
}