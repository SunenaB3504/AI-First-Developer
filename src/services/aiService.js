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

/**
 * Simulates providing an answer to a user's specific question based on keywords.
 * @param {string} question - The user's question.
 * @returns {Promise<{text: string}>} A promise that resolves with a simulated AI answer object.
 */
export const getAIAnswerForQuestion = (question) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerCaseQuestion = question.toLowerCase();
      let answerText = "I'm still learning about that topic. Try asking me about HTML, CSS, or gamification!";

      if (lowerCaseQuestion.includes('html') || lowerCaseQuestion.includes('semantic')) {
        answerText = "<strong>Semantic HTML</strong> is the practice of using HTML tags that convey the meaning of the information in the tag. For example, using <strong>&lt;header&gt;</strong> for your page header, <strong>&lt;nav&gt;</strong> for navigation links, and <strong>&lt;article&gt;</strong> for your main content. It's crucial for accessibility and SEO!";
      } else if (lowerCaseQuestion.includes('css') || lowerCaseQuestion.includes('style')) {
        answerText = "<strong>CSS Specificity</strong> is the set of rules browsers use to determine which style declaration is applied to an element. An inline style is most specific, followed by IDs, then classes/attributes, and finally element selectors. Understanding this hierarchy is key to avoiding styling conflicts.";
      } else if (lowerCaseQuestion.includes('streak') || lowerCaseQuestion.includes('badge')) {
        answerText = "You can earn <strong>badges</strong> by completing all lessons in a module (like the 'HTML Novice' badge). You can build your <strong>learning streak</strong> by completing at least one lesson each day. Keep it up to earn streak-related badges!";
      }

      resolve({
        text: answerText,
      });
    }, 1500); // Simulate a slightly longer delay for a "deeper" thought process
  });
};
