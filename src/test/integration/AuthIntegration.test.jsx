import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '../../context/AuthContext';
import Header from '../../components/layout/Header';

// Mock Firebase Auth
const mockSignInWithEmailAndPassword = vi.fn();
const mockSignOut = vi.fn();
const mockOnAuthStateChanged = vi.fn();

vi.mock('../../firebase/config', () => ({
  auth: {
    signInWithEmailAndPassword: (...args) => mockSignInWithEmailAndPassword(...args),
    signOut: () => mockSignOut(),
    onAuthStateChanged: (callback) => {
      mockOnAuthStateChanged(callback);
      // Simulate user login
      callback({ uid: '123', email: 'test@example.com' });
      return () => {}; // unsubscribe function
    },
  },
}));

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  doc: vi.fn(),
  setDoc: vi.fn(),
  getDoc: vi.fn(),
  updateDoc: vi.fn(),
  serverTimestamp: vi.fn(),
}));

const renderWithAuth = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Auth Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('complete login to logout flow', async () => {
    const user = userEvent.setup();

    // Mock successful login
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: { uid: '123', email: 'test@example.com' }
    });

    renderWithAuth(<Header />);

    // Initially should show navigation when user is logged in (from onAuthStateChanged)
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Learn' })).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: 'Portfolio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Analytics' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();

    // Click logout
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    await user.click(logoutButton);

    // Verify signOut was called
    expect(mockSignOut).toHaveBeenCalledTimes(1);

    // Simulate logout by calling onAuthStateChanged with null
    mockOnAuthStateChanged.mock.calls[0][0](null);

    // Navigation should be hidden after logout
    await waitFor(() => {
      expect(screen.queryByRole('link', { name: 'Learn' })).not.toBeInTheDocument();
    });

    expect(screen.queryByRole('link', { name: 'Portfolio' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Profile' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Analytics' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Logout' })).not.toBeInTheDocument();

    // Logo should still be visible
    expect(screen.getByRole('link', { name: /ai learning platform/i })).toBeInTheDocument();
  });

  test('handles auth state changes correctly', async () => {
    renderWithAuth(<Header />);

    // Initially logged in (from onAuthStateChanged)
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Learn' })).toBeInTheDocument();
    });

    // Simulate user logout
    mockOnAuthStateChanged.mock.calls[0][0](null);

    // Navigation should disappear
    await waitFor(() => {
      expect(screen.queryByRole('link', { name: 'Learn' })).not.toBeInTheDocument();
    });

    // Simulate user login
    mockOnAuthStateChanged.mock.calls[0][0]({ uid: '456', email: 'new@example.com' });

    // Navigation should reappear
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Learn' })).toBeInTheDocument();
    });
  });
});