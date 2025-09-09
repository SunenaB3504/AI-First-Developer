import { describe, test, expect, vi } from 'vitest';
import { getAIResponse, getAIAnswerForQuestion } from './aiService';

// Mock setTimeout
vi.useFakeTimers();

describe('aiService', () => {
  test('getAIResponse returns correct response for known context', async () => {
    const promise = getAIResponse('html-introduction');
    vi.advanceTimersByTime(1200);
    const response = await promise;
    expect(response).toEqual({
      text: "Here's a tip: Always use semantic HTML tags like `<header>`, `<footer>`, and `<article>`. It improves accessibility and SEO!",
    });
  });

  test('getAIResponse returns default response for unknown context', async () => {
    const promise = getAIResponse('unknown-context');
    vi.advanceTimersByTime(1200);
    const response = await promise;
    expect(response).toEqual({
      text: "Select a lesson to get a specific AI tip, or ask me a question about web development!",
    });
  });

  test('getAIAnswerForQuestion returns answer for HTML-related question', async () => {
    const promise = getAIAnswerForQuestion('What is semantic HTML?');
    vi.advanceTimersByTime(1500);
    const response = await promise;
    expect(response.text).toContain('Semantic HTML');
  });

  test('getAIAnswerForQuestion returns answer for CSS-related question', async () => {
    const promise = getAIAnswerForQuestion('What is CSS specificity?');
    vi.advanceTimersByTime(1500);
    const response = await promise;
    expect(response.text).toContain('CSS Specificity');
  });

  test('getAIAnswerForQuestion returns default answer for unknown question', async () => {
    const promise = getAIAnswerForQuestion('What is quantum physics?');
    vi.advanceTimersByTime(1500);
    const response = await promise;
    expect(response.text).toContain("I'm still learning about that topic");
  });

  test('responses are delayed by setTimeout', () => {
    vi.useRealTimers();
    const start = Date.now();
    const promise = getAIResponse('html-introduction');
    return promise.then(() => {
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(1200);
    });
  });
});