/**
 * @file aiService.js
 * @description A mock service to simulate AI-powered responses and guidance.
 */

/**
 * A dictionary of pre-written AI responses mapped to specific lesson contexts.
 */
const responses = {
  'html-introduction': "Here's a tip: Always use semantic HTML tags like `<header>`, `<footer>`, and `<article>`. It improves accessibility and SEO!",
  'css-selectors': "CSS Specificity is key! An ID selector (`#id`) is more specific than a class selector (`.class`), which is more specific than a type selector (`p`).",
  'javascript-variables': "Remember the difference between `let`, `const`, and `var`. Use `const` by default and `let` when you know the variable will be reassigned.",
  'git-basics': "A great Git habit is to make small, frequent commits with clear messages. It makes your project history much easier to understand!",
  default: "Select a lesson to get a specific AI tip, or ask me a question about web development!",
};

/**
 * Simulates a call to an AI service to get a response based on a given context.
 * @param {string} context - The context (e.g., lesson ID) to get a response for.
 * @returns {Promise<{text: string}>} A promise that resolves with a simulated AI response object.
 */
export const getAIResponse = (context) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responseText = responses[context] || responses.default;
      resolve({
        text: responseText,
      });
    }, 1200); // Simulate network delay
  });
};
