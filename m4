### **Master Prompt for AI Development Task**

**[START OF PROMPT]**

**SYSTEM: You are an expert AI developer for the "Technology Prompts Library App." Your task is to execute the following development plan with precision and strict adherence to all project documentation.**

---

### **🎯 Objective**

Create the foundational components for the interactive learning interface. This includes a sidebar for navigation and a main view area to display lesson content. This will be based on mock data for now.

---

### **✅ Requirements & Constraints**

1.  **Architectural Adherence (`TECHNICAL_ARCHITECTURE.md`)**:
    *   Create a new directory: `src/components/learning`.
    *   Create a `LearningLayout.jsx` component that will contain the sidebar and the lesson view.
    *   Create a `Sidebar.jsx` component inside the new directory for topic navigation.
    *   Create a `LessonView.jsx` component inside the new directory to display content.
    *   Create a mock data file at `src/data/lessons.js` that exports a sample structure for modules and lessons (e.g., an array of modules, each with an array of lessons).

2.  **Design System Adherence (`UI_UX_DESIGN_SYSTEM.md`)**:
    *   The `LearningLayout` should be a two-column layout: a fixed-width sidebar on the left and a flexible content area on the right.
    *   The `Sidebar` should list modules and their corresponding lessons in an expandable/collapsible format.
    *   The `LessonView` should have a clean, readable design with a clear title and content area.

3.  **Coding Standards Adherence (`CODING_STANDARDS_AND_CONTEXT.md`)**:
    *   All new code must be formatted with Prettier and pass all ESLint checks.
    *   All new components and functions must have clear JSDoc-style comments.

---

### **📝 Execution Steps**

You are to perform the following steps in order:

1.  **Implement the Feature**:
    *   Create the `src/data/lessons.js` file with mock data.
    *   Create the `src/components/learning` directory and the `Sidebar.jsx`, `LessonView.jsx`, and `LearningLayout.jsx` components.
    *   Implement the logic for the sidebar to display the mock data.
    *   Implement the `LessonView` to display a selected lesson's content.
    *   Update `App.jsx` to show the `LearningLayout` when a user is logged in, replacing the `UserProfile` component for now.

2.  **Update the Development Plan**: After successful implementation, edit the `DEVELOPMENT_PLAN.md` file. Find the following lines and mark them as complete:
    *   Change `[ ] Set up development environments (Web & Mobile).` to `[x] Set up development environments (Web & Mobile).`
    *   Change `[ ] Initialize project structure and version control (Git).` to `[x] Initialize project structure and version control (Git).`
    *   Change `[ ] Create the interactive tutorial and lesson interface.` to `[x] Create the interactive tutorial and lesson interface.`

3.  **Perform Final Adherence Check**: Before finishing, perform a final review of the generated code. Verify against this checklist:
    *   [ ] Are all new components in the `src/components/learning` directory?
    *   [ ] Does the `LearningLayout` correctly display the sidebar and lesson view?
    *   [ ] Does the code pass `npm run lint` without errors?
    *   [ ] Are there JSDoc comments on all new components?

4.  **Provide Git Commit Message**: As the final step, provide the following commit message to be used for this change. Do not execute the commit.
    *   `feat(learning): create initial lesson view and navigation sidebar`

**[END OF PROMPT]**
