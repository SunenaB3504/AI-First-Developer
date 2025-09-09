import { describe, test, expect, vi, beforeEach } from 'vitest';
import { logUserActivity, getUserProgressAnalytics, getPlatformAnalytics, getPerformanceMetrics } from './analyticsService';

// Mock Firebase
const mockAddDoc = vi.fn();
const mockGetDocs = vi.fn();
const mockQuery = vi.fn();
const mockWhere = vi.fn();
const mockOrderBy = vi.fn();
const mockLimit = vi.fn();
const mockCollection = vi.fn();
const mockDoc = vi.fn();

vi.mock('../firebase/config', () => ({
  db: 'mock-db',
}));

vi.mock('firebase/firestore', () => ({
  addDoc: (...args) => mockAddDoc(...args),
  getDocs: (...args) => mockGetDocs(...args),
  query: (...args) => mockQuery(...args),
  where: (...args) => mockWhere(...args),
  orderBy: (...args) => mockOrderBy(...args),
  limit: (...args) => mockLimit(...args),
  collection: (...args) => mockCollection(...args),
  doc: (...args) => mockDoc(...args),
  serverTimestamp: () => ({ seconds: Date.now() / 1000 }),
}));

// Mock the collection to return a mock ref
mockCollection.mockReturnValue('mock-collection-ref');

describe('analyticsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('logUserActivity calls addDoc with correct data', async () => {
    mockAddDoc.mockResolvedValue({ id: 'activity-id' });

    await logUserActivity('user123', 'lesson_completed', { lessonId: 'html-intro' });

    expect(mockAddDoc).toHaveBeenCalledWith(
      "mock-collection-ref",
      expect.objectContaining({
        userId: 'user123',
        activityType: 'lesson_completed',
        metadata: { lessonId: 'html-intro' },
      })
    );
  });

  test('getUserProgressAnalytics processes activities correctly', async () => {
    const mockActivities = [
      { data: () => ({ activityType: 'lesson_completed', metadata: { lessonId: 'html' }, timestamp: { seconds: 1234567890 } }) },
      { data: () => ({ activityType: 'badge_earned', metadata: { badgeId: 'novice' }, timestamp: { seconds: 1234567891 } }) },
    ];
    mockGetDocs.mockResolvedValue({ docs: mockActivities });

    const result = await getUserProgressAnalytics('user123');

    expect(result).toEqual({
      totalActivities: 2,
      lessonCompletions: 1,
      badgeEarnings: 1,
      recentActivities: expect.any(Array),
    });
  });

  test('getPerformanceMetrics returns mock data', async () => {
    const result = await getPerformanceMetrics();

    expect(result).toHaveProperty('averageSessionDuration');
    expect(result).toHaveProperty('pageLoadTime');
    expect(result).toHaveProperty('errorRate');
    expect(result).toHaveProperty('userRetention');
  });
});