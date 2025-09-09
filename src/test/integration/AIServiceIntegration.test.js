import { vi } from 'vitest';
import { getAIResponse, getAIAnswerForQuestion } from '../../services/aiService';
import { analyticsService } from '../../services/analyticsService';

// Mock the analytics service to track calls
vi.mock('../../services/analyticsService', () => ({
  analyticsService: {
    logActivity: vi.fn(),
    getAnalyticsData: vi.fn(),
  },
}));

describe('AI Service Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('AI response generation with context and question handling', async () => {
    // Test getAIResponse for lesson context
    const contextPromise = getAIResponse('html-introduction');
    vi.advanceTimersByTime(1200);
    const contextResponse = await contextPromise;

    expect(contextResponse).toEqual({
      text: "Here's a tip: Always use semantic HTML tags like `<header>`, `<footer>`, and `<article>`. It improves accessibility and SEO!",
    });

    // Test getAIAnswerForQuestion for user questions
    const questionPromise = getAIAnswerForQuestion('What is semantic HTML?');
    vi.advanceTimersByTime(1500);
    const questionResponse = await questionPromise;

    expect(questionResponse.text).toContain('Semantic HTML');
    expect(questionResponse.text).toContain('accessibility');
  });

  test('AI service handles multiple concurrent requests', async () => {
    // Start multiple AI requests simultaneously
    const promises = [
      getAIResponse('html-introduction'),
      getAIAnswerForQuestion('What is CSS specificity?'),
      getAIResponse('javascript-variables'),
      getAIAnswerForQuestion('How do I earn badges?'),
    ];

    // Fast-forward timers to complete all delayed responses
    vi.advanceTimersByTime(2000);

    // Wait for all responses
    const responses = await Promise.all(promises);

    // Verify all responses were generated
    expect(responses).toHaveLength(4);

    // Check specific responses
    expect(responses[0].text).toContain('semantic HTML');
    expect(responses[1].text).toContain('CSS Specificity');
    expect(responses[2].text).toContain('let');
    expect(responses[3].text).toContain('badges');
  });

  test('AI service error handling and fallbacks', async () => {
    // Test unknown context falls back to default
    const unknownContextPromise = getAIResponse('unknown-topic');
    vi.advanceTimersByTime(1200);
    const unknownResponse = await unknownContextPromise;

    expect(unknownResponse).toEqual({
      text: "Select a lesson to get a specific AI tip, or ask me a question about web development!",
    });

    // Test unknown question falls back to default
    const unknownQuestionPromise = getAIAnswerForQuestion('What is quantum physics?');
    vi.advanceTimersByTime(1500);
    const unknownQuestionResponse = await unknownQuestionPromise;

    expect(unknownQuestionResponse.text).toContain("I'm still learning");
    expect(unknownQuestionResponse.text).toContain('HTML, CSS, or gamification');
  });
});