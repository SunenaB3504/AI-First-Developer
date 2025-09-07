### **Master Prompt for AI Development Task**

**[START OF PROMPT]**

**SYSTEM: You are an expert AI developer for the "Technology Prompts Library App." Your task is to execute the following development plan with precision and strict adherence to all project documentation.**

---

### **🎯 Objective**

Build the backend infrastructure for tracking user progress using a Firestore database. This involves defining the data schema and creating the necessary service functions to interact with the database.

---

### **✅ Requirements & Constraints**

1.  **Architectural Adherence (`TECHNICAL_ARCHITECTURE.md` & `DATA_ARCHITECTURE.md`)**:
    *   Use **Cloud Firestore** as the database.
    *   Create a new file at `src/firebase/progressService.js` to house all functions related to progress tracking.
    *   The database will have a top-level collection named `progress`.
    *   Each document in the `progress` collection will have a document ID matching the user's UID from Firebase Auth.

2.  **Data Schema Adherence (`DATA_ARCHITECTURE.md`)**:
    *   Each user's progress document must contain the following fields:
        *   `userId` (string): The user's unique ID.
        *   `completedModules` (array of strings): A list of completed module IDs.
        *   `completedLessons` (array of strings): A list of completed lesson IDs.
        *   `lastAccessed` (timestamp): The timestamp of the user's last activity.

3.  **Coding Standards Adherence (`CODING_STANDARDS_AND_CONTEXT.md`)**:
    *   All new code must be formatted with Prettier and pass all ESLint checks.
    *   All new functions must have clear JSDoc-style comments explaining their purpose, parameters, and return values.

---

### **📝 Execution Steps**

You are to perform the following steps in order:

1.  **Implement the Feature**:
    *   In `src/firebase/config.js`, import and export the Firestore service.
    *   Create the `src/firebase/progressService.js` file.
    *   Implement and export the following functions:
        *   `createUserProgress(userId)`: Creates a new progress document for a user upon registration.
        *   `getUserProgress(userId)`: Retrieves a user's progress document.
        *   `updateUserProgress(userId, progressData)`: Updates a user's progress document.
    *   For demonstration purposes, modify `UserProfile.jsx` to fetch and display the user's progress data (or a message if it doesn't exist).

2.  **Update the Development Plan**: After successful implementation, edit the `DEVELOPMENT_PLAN.md` file. Find the following line and mark it as complete:
    *   Change `[ ] Build the backend infrastructure for progress tracking (Firestore database schema).`
    *   To `[x] Build the backend infrastructure for progress tracking (Firestore database schema).`

3.  **Perform Final Adherence Check**: Before finishing, perform a final review of the generated code. Verify against this checklist:
    *   [ ] Is the Firestore service correctly initialized in `config.js`?
    *   [ ] Does `progressService.js` contain the required functions?
    *   [ ] Does the code pass `npm run lint` without errors?
    *   [ ] Are there JSDoc comments on all new functions?

4.  **Provide Git Commit Message**: As the final step, provide the following commit message to be used for this change. Do not execute the commit.
    *   `feat(firestore): implement progress tracking schema and services`

**[END OF PROMPT]**
