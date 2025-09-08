/**
 * @file Mock data for lessons and modules.
 */

export const modules = [
  {
    id: 'html',
    title: 'HTML5 Fundamentals',
    lessons: [
      { id: 'html-1', title: 'Introduction to HTML', content: '<h1>HTML is the standard markup language for creating Web pages.</h1>' },
      { id: 'html-2', title: 'HTML Tags and Elements', content: '<p>HTML tags are element names surrounded by angle brackets.</p>' },
    ],
  },
  {
    id: 'css',
    title: 'CSS3 Styling',
    lessons: [
      { id: 'css-1', title: 'Introduction to CSS', content: '<h1>CSS is the language we use to style an HTML document.</h1>' },
      { id: 'css-2', title: 'CSS Selectors', content: '<p>A CSS selector selects the HTML element(s) you want to style.</p>' },
    ],
  },
];
