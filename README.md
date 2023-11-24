# CODEXGURU - An Interactive Programming Assistance Platform

## Group Details

### Batch : **Y3.S2.WE.SE.01.01**

### Group ID : **GRP_74**

### Members

- [IT21109126 - Maharanhindage V.A.R](https://github.com/vibhashan)
- [IT20611088 - Jayakody D.M.L.D](https://github.com/IT20611088)
- [IT21012488 - Shavinda H.K.L](https://github.com/shavindaL)
- [IT21001352 - Madhubhashana K.S](https://github.com/Sandaru-IT21001352)

## Overview
**CODEXGURU** is an interactive programming assistance platform designed to help instructors and novice programmers collaborate and learn effectively.

### Features

* Code Editor  
An inbuilt code editor that supports more than 40 programming languages with syntax highlighting and auto completion for selected languages (JavaScript, TypeScript).  

* Chat Forum  
A chat forum (new session per lab) where students can post the doubts and others can reply.  

* Online Examination Environment  
An online exam environment, where an instructor can schedule an exam (typically MCQ based) with automated marking.

* AI chatbot  
An AI chatbot powered by OpenAI's API that can answer programming related questions.

* User Management  
This feature allows the platform admin to add/manage the relevant lab instructors and students.

### Tech Stack

* Next.js
* Express.js
* TypeScript
* Socket.io
* MongoDB
* Docker
* Firebase Storage

### Instructions to run the project
1. Clone the repository
    ```
    https://github.com/SLIIT-Y3S2/CodexGuru
    ```
2. Navigate to the project directory
    ```
    cd CodexGuru
    ```

3. Navigate to the frontend directory
    ```
    cd codexguru-client
    ```
4. Create a .env file in the frontend directory and add the following environment variables
    ```
    NEXTAUTH_SECRET= <Your NextAuth Secret>
    NEXTAUTH_URL= <Your NextAuth URL>
    BACKEND_URL= <Your Backend URL>
    NEXT_PUBLIC_FIREBASE_API_KEY= <Your Firebase API Key>
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAI= <Your Firebase Auth Domain>
    NEXT_PUBLIC_FIREBASE_PROJECT_ID= <Your Firebase Project ID>
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= <Your Firebase Storage Bucket>
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= <Your Firebase Messaging Sender ID>
    NEXT_PUBLIC_FIREBASE_APP_ID= <Your Firebase App ID>
    ```

5. Install the dependencies
    ```
    npm install
    ```
6. Run the frontend
    ```
    npm run dev
    ```
7. Navigate to the backend directory
    ```
    cd codexguru-server
    ```
8. Create a .env file in the backend directory and add the following environment variables
    ```
    MONGO_URI = <Your MongoDB URI>
    PORT = <Your Port Number>
    JWT_SECRET = <Your JWT Secret>
    COMPILER_PATH = <Your Compiler Path>
    OPENAI_API_KEY= <Your OpenAI API Key>
    ```    
9. Install the dependencies
    ```
    npm install
    ```
10. Run the backend
    ```
    npm run dev
    ```
11. Open the browser and navigate to the following URL : http://localhost:3000
    