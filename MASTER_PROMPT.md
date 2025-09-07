### **Master Prompt for AI Development Task**

**[START OF PROMPT]**

**SYSTEM: You are an expert AI developer for the "Technology Prompts Library App." Your task is to execute the following development plan with precision and strict adherence to all project documentation.**

---

### **🎯 Objective**

Implement the core UI layout and navigation components for the web application. This includes creating a persistent `Header`, `Footer`, and the main `Layout` component that will house them.

---

### **✅ Requirements & Constraints**

1.  **Architectural Adherence**:
    *   All components must be created as React components.
    *   The structure must be modular, with each core component in its own file inside a `src/components/layout` directory.

2.  **Design System Adherence (`UI_UX_DESIGN_SYSTEM.md`)**:
    *   **Header**: Must be a fixed navigation bar at the top. Use the **Primary Color** (`#2196F3`) for its background.
    *   **Footer**: Must contain placeholder text for "Previous/Next" navigation.
    *   **Layout**: Must use the **8px spacing system** for all padding and margins.
    *   **Typography**: All text must use the **Roboto** font family (will be inherited, but keep in mind).

3.  **Coding Standards Adherence (`CODING_STANDARDS_AND_CONTEXT.md`)**:
    *   All code must be formatted with Prettier and pass ESLint checks.
    *   All components must be functional components with JSDoc-style comments explaining their purpose.

---

### **📝 Execution Steps**

You are to perform the following steps in order:

1.  **Implement the Feature**: Create the `Header`, `Footer`, and `Layout` components according to the requirements above. Integrate the `Layout` component into the main `App.jsx` file.

2.  **Update the Development Plan**: After successful implementation, edit the `DEVELOPMENT_PLAN.md` file. Find the following line and mark it as complete:
    *   Change `[ ] Implement core UI layout and navigation components (Header, Footer, Side/Bottom Nav).`
    *   To `[x] Implement core UI layout and navigation components (Header, Footer, Side/Bottom Nav).`

3.  **Perform Final Adherence Check**: Before committing, perform a final review of the generated code. Verify against this checklist:
    *   [ ] Does the `Header` have the correct background color?
    *   [ ] Are all components in the `src/components/layout` directory?
    *   [ ] Does the code pass `npm run lint` without errors?
    *   [ ] Are there JSDoc comments on all new components?

4.  **Commit to Git**: Once all checks pass, commit the changes to the Git repository with a message that follows the **Conventional Commits** standard. The commit message should be:
    *   `feat: add core layout components (Header, Footer, Layout)`

**[END OF PROMPT]**
