# Coding Standards and Context Preservation Strategy

---

This document outlines the essential guidelines for maintaining code quality, consistency, and project context for the **Technology Prompts Library App**. Adherence to these standards is critical for effective AI-assisted development and long-term maintainability.

## 1. Context Preservation Strategy

This strategy ensures that project knowledge is captured and accessible, providing the necessary context for both human and AI developers.

| Practice | Description |
| :--- | :--- |
| **Development Documentation** | Maintain a `CHANGELOG.md` file to log significant changes, features, and bug fixes in each version. |
| **Code Comments** | - Write comprehensive inline comments for complex logic, algorithms, or non-obvious code sections. <br> - Use JSDoc-style comments for all functions to explain their purpose, parameters, and return values. |
| **Architecture Decisions** | Create and maintain an `ADR` (Architecture Decision Record) directory. Each major technical decision (e.g., choosing a library, changing an architecture pattern) must be documented in a new markdown file. |
| **Progress Tracking** | All development work must be associated with a task or milestone in the `DEVELOPMENT_PLAN.md`. |
| **Version Control (Git)** | - **Branching**: Use a `Git-Flow`-like model (`main`, `develop`, `feature/`, `bugfix/`, `release/`). <br> - **Commits**: Write meaningful commit messages following the [Conventional Commits](https://www.conventionalcommits.org/) specification (e.g., `feat: add user login page`). This creates a clear and machine-readable history. |

---

## 2. Quality Assurance & Coding Standards

These standards ensure that all code is clean, consistent, and high-quality.

| Area | Tool/Standard | Configuration & Rules |
| :--- | :--- | :--- |
| **Code Formatting** | **Prettier** | An automated, opinionated code formatter. A `.prettierrc` file will be included in the project root to enforce a single style guide (e.g., tab width, semi-colons, trailing commas). All code must be formatted before being committed. |
| **Code Linting** | **ESLint** | A static code analysis tool to find and fix problems in JavaScript code. A `.eslintrc.js` file will define rules to prevent common errors, enforce best practices (e.g., no unused variables), and maintain a consistent coding style. |
| **Testing Strategy**| **Jest & React Testing Library** | - **Unit Tests**: All individual functions and components must have unit tests. <br> - **Integration Tests**: Test the interaction between multiple components. <br> - **E2E Testing**: Use a framework like Cypress to test critical user flows from end-to-end. <br> - **TDD**: Test-Driven Development is encouraged. |
| **Performance** | **Bundle Size & Load Times** | - Regularly monitor the application's bundle size. <br> - Optimize assets (images, fonts) and leverage code-splitting to ensure fast load times (< 3 seconds). |
| **Accessibility** | **WCAG AA Compliance** | - Use semantic HTML. <br> - Ensure all interactive elements are keyboard-accessible. <br> - Provide `alt` text for all images. <br> - Use tools like `axe` to audit for accessibility issues. |

---

## 3. Modular Architecture Guidelines

To ensure the codebase is maintainable and scalable, a modular, component-based architecture must be followed.

- **Component-Based Design**: Break down the UI into small, reusable, and independent components.
- **Service Layer**: Abstract all business logic (e.g., API calls, data manipulation) into a separate service layer, keeping it decoupled from the UI.
- **Data Layer**: Isolate all data access logic. The UI should not know or care if data is coming from a local cache or a remote server.
- **Utility Functions**: Create a shared `utils` directory for common, pure functions (e.g., date formatting, string manipulation) that can be used across the application.
- **Theme System**: Centralize all styling variables (colors, fonts, spacing) into a theme object that can be easily swapped or updated.
