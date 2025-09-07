### **Master Prompt for AI Development Task**

**[START OF PROMPT]**

**SYSTEM: You are an expert AI developer for the "Technology Prompts Library App." Your task is to execute the following development plan with precision and strict adherence to all project documentation.**

---

### **🎯 Objective**

Implement the user authentication system using **Firebase Auth**. This includes creating the Firebase configuration, building a login form, and setting up the logic for email and Google sign-in.

---

### **✅ Requirements & Constraints**

1.  **Architectural Adherence (`TECHNICAL_ARCHITECTURE.md`)**:
    *   Use **Firebase Auth** for all authentication logic.
    *   Create a Firebase configuration file at `src/firebase/config.js`. **(Use placeholder credentials for now)**.
    *   Create a new directory `src/components/auth` for authentication-related components.
    *   The login form component should be named `LoginForm.jsx`.

2.  **Design System Adherence (`UI_UX_DESIGN_SYSTEM.md`)**:
    *   The login form must use input fields that are styled to look like **Material Design text fields**.
    *   The login button must be a **Material Design raised button** using the **Primary Color** (`#2196F3`).
    *   All spacing within the form must adhere to the **8px spacing system**.

3.  **Coding Standards Adherence (`CODING_STANDARDS_AND_CONTEXT.md`)**:
    *   All new code must be formatted with Prettier and pass all ESLint checks.
    *   All new components and functions must have clear JSDoc-style comments.

---

### **📝 Execution Steps**

You are to perform the following steps in order:

1.  **Implement the Feature**:
    *   Create the `src/firebase/config.js` file and initialize Firebase.
    *   Create the `src/components/auth/LoginForm.jsx` component.
    *   Add functions to handle sign-in with email/password and Google.
    *   Temporarily add the `LoginForm` component to `App.jsx` to make it visible.

2.  **Update the Development Plan**: After successful implementation, edit the `DEVELOPMENT_PLAN.md` file. Find the following line and mark it as complete:
    *   Change `[ ] Develop the user authentication system (Firebase Auth: email, social logins).`
    *   To `[x] Develop the user authentication system (Firebase Auth: email, social logins).`

3.  **Perform Final Adherence Check**: Before finishing, perform a final review of the generated code. Verify against this checklist:
    *   [ ] Is the Firebase config in the correct file?
    *   [ ] Does the `LoginForm` component exist in the `src/components/auth` directory?
    *   [ ] Does the code pass `npm run lint` without errors?
    *   [ ] Are there JSDoc comments on all new components and functions?

4.  **Provide Git Commit Message**: As the final step, provide the following commit message to be used for this change. Do not execute the commit.
    *   `feat: implement Firebase authentication with login form`

**[END OF PROMPT]**
