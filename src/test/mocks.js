// Mock data for testing
export const mockUser = {
  uid: 'test-user-id',
  email: 'test@example.com',
  displayName: 'Test User',
};

export const mockLesson = {
  id: 'html-introduction',
  title: 'Introduction to HTML',
  content: 'HTML is the skeleton of web pages.',
};

export const mockBadge = {
  id: 'html-novice',
  name: 'HTML Novice',
  description: 'Awarded for completing the HTML module.',
  icon: '🏆',
};

export const mockAnalyticsData = {
  totalActivities: 10,
  lessonCompletions: 5,
  badgeEarnings: 2,
  recentActivities: [
    { activityType: 'lesson_completed', metadata: { lessonId: 'html-introduction' }, timestamp: { seconds: Date.now() / 1000 } },
  ],
};