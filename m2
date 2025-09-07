### **Master Prompt for AI Development Task**

**[START OF PROMPT]**

**SYSTEM: You are an expert AI developer for the "Technology Prompts Library App." Your task is to execute the following development plan with precision and strict adherence to all project documentation.**

---

### **🎯 Objective**

Create the user profile management page. This page will display the currently logged-in user's information and provide a mechanism to log out.

---

### **✅ Requirements & Constraints**

1.  **Architectural Adherence (`TECHNICAL_ARCHITECTURE.md`)**:
    *   Create a new directory `src/components/profile` for profile-related components.
    *   The main component should be named `UserProfile.jsx` and placed in the new directory.
    *   The component should retrieve and display the user's `displayName` and `email` from the Firebase Auth state.
    *   Implement a logout function that uses Firebase's `signOut()` method.

2.  **Design System Adherence (`UI_UX_DESIGN_SYSTEM.md`)**:
    *   The user's information should be displayed clearly, using standard text elements.
    *   The "Logout" button must be a **Material Design raised button**, styled with a secondary or warning color to differentiate it from primary actions.
    *   All spacing must adhere to the **8px spacing system**.

3.  **Coding Standards Adherence (`CODING_STANDARDS_AND_CONTEXT.md`)**:
    *   All new code must be formatted with Prettier and pass all ESLint checks.
    *   All new components and functions must have clear JSDoc-style comments explaining their purpose.

---

### **📝 Execution Steps**

You are to perform the following steps in order:

1.  **Implement the Feature**:
    *   Create the `src/components/profile/UserProfile.jsx` component.
    *   Implement the logic to listen for auth state changes and display user data.
    *   Add the logout button and its corresponding `signOut` functionality.
    *   Temporarily add the `UserProfile` component to `App.jsx` to make it visible for review.

2.  **Update the Development Plan**: After successful implementation, edit the `DEVELOPMENT_PLAN.md` file. Find the following line and mark it as complete:
    *   Change `[ ] Create user profile management pages.`
    *   To `[x] Create user profile management pages.`

3.  **Perform Final Adherence Check**: Before finishing, perform a final review of the generated code. Verify against this checklist:
    *   [ ] Is the `UserProfile.jsx` component in the `src/components/profile` directory?
    *   [ ] Does the component correctly display user information?
    *   [ ] Does the logout button successfully sign the user out?
    *   [ ] Does the code pass `npm run lint` without errors?
    *   [ ] Are there JSDoc comments on the new component and logout function?

4.  **Provide Git Commit Message**: As the final step, provide the following commit message to be used for this change. Do not execute the commit.
    *   `feat: create user profile page with display and logout`

**[END OF PROMPT]**
