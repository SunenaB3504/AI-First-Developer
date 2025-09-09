import { vi } from 'vitest';
import { getUserProgress, updateUserProgress } from '../../services/progressService';
import { analyticsService } from '../../services/analyticsService';

// Mock Firebase Firestore
const mockGetDoc = vi.fn();
const mockUpdateDoc = vi.fn();
const mockSetDoc = vi.fn();
const mockDoc = vi.fn();
const mockArrayUnion = vi.fn();
const mockGetFirestore = vi.fn();
const mockServerTimestamp = vi.fn();

vi.mock('firebase/firestore', () => ({
  getDoc: vi.fn(),
  updateDoc: vi.fn(),
  setDoc: vi.fn(),
  doc: vi.fn(),
  arrayUnion: vi.fn(),
  getFirestore: vi.fn(),
  serverTimestamp: vi.fn(),
}));

// Mock analytics service
vi.mock('../../services/analyticsService', () => ({
  analyticsService: {
    logActivity: vi.fn(),
  },
  logUserActivity: vi.fn(),
}));

describe('Learning Progress Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('lesson completion updates progress and logs analytics', async () => {
    const { analyticsService } = await import('../../services/analyticsService');

    // Mock document doesn't exist (first lesson completion)
    mockGetDoc.mockResolvedValue({
      exists: () => false,
    });

    const userId = 'user123';
    const lessonId = 'lesson-1';

    await updateUserProgress(userId, lessonId);

    // Verify document was created with the lesson
    expect(mockSetDoc).toHaveBeenCalledWith(
      mockDoc(),
      { completedLessons: [lessonId] }
    );

    // Verify analytics was logged
    expect(analyticsService.logActivity).toHaveBeenCalledWith(
      userId,
      'lesson_completed',
      { lessonId }
    );
  });

  test('multiple lesson completions accumulate in progress', async () => {
    const { analyticsService } = await import('../../services/analyticsService');

    // Mock existing progress with one completed lesson
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ completedLessons: ['lesson-1'] }),
    });

    const userId = 'user123';
    const newLessonId = 'lesson-2';

    await updateUserProgress(userId, newLessonId);

    // Verify document was updated with array union
    expect(mockUpdateDoc).toHaveBeenCalledWith(
      mockDoc(),
      { completedLessons: mockArrayUnion(newLessonId) }
    );

    // Verify analytics was logged for the new completion
    expect(analyticsService.logActivity).toHaveBeenCalledWith(
      userId,
      'lesson_completed',
      { lessonId: newLessonId }
    );
  });

  test('getUserProgress retrieves completed lessons', async () => {
    const completedLessons = ['lesson-1', 'lesson-2', 'lesson-3'];

    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ completedLessons }),
    });

    const userId = 'user123';
    const progress = await getUserProgress(userId);

    expect(progress).toEqual(completedLessons);
    expect(mockGetDoc).toHaveBeenCalledWith(mockDoc());
  });

  test('getUserProgress returns empty array for new user', async () => {
    mockGetDoc.mockResolvedValue({
      exists: () => false,
    });

    const userId = 'new-user';
    const progress = await getUserProgress(userId);

    expect(progress).toEqual([]);
  });

  test('progress integration with analytics tracking', async () => {
    const { analyticsService } = await import('../../services/analyticsService');

    // Complete multiple lessons
    const lessons = ['lesson-1', 'lesson-2', 'lesson-3'];

    for (const lessonId of lessons) {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({ completedLessons: ['lesson-1'] }), // Mock existing progress
      });

      await updateUserProgress('user123', lessonId);
    }

    // Verify analytics was called for each lesson completion
    expect(analyticsService.logActivity).toHaveBeenCalledTimes(3);

    lessons.forEach((lessonId, index) => {
      expect(analyticsService.logActivity).toHaveBeenNthCalledWith(
        index + 1,
        'user123',
        'lesson_completed',
        { lessonId }
      );
    });
  });

  test('handles errors gracefully', async () => {
    const { analyticsService } = await import('../../services/analyticsService');

    // Mock Firestore error
    mockGetDoc.mockRejectedValue(new Error('Firestore error'));

    const userId = 'user123';
    const progress = await getUserProgress(userId);

    // Should return empty array on error
    expect(progress).toEqual([]);

    // Try updating progress with error
    mockUpdateDoc.mockRejectedValue(new Error('Update error'));

    // This should not throw, but log error
    await updateUserProgress(userId, 'lesson-1');

    // Analytics should still be called even if Firestore fails
    expect(analyticsService.logActivity).toHaveBeenCalledWith(
      userId,
      'lesson_completed',
      { lessonId: 'lesson-1' }
    );
  });
});