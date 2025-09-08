/**
 * @file Mock data for lessons and modules.
 */
import html5Content from './html5.js';

export const modules = [
  html5Content,
  {
    id: 'css',
    title: 'CSS3 Styling',
    lessons: [
      { id: 'css-1', title: 'Introduction to CSS', content: '<h1>CSS is the language we use to style an HTML document.</h1>' },
      { id: 'css-2', title: 'CSS Selectors', content: '<p>A CSS selector selects the HTML element(s) you want to style.</p>' },
    ],
  },
];
