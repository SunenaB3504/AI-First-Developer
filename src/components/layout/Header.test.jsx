// Mock the firebase auth
const mockSignOut = vi.fn();

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Header from './Header';

// Mock the auth context
const mockUseAuth = vi.fn();
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock the firebase auth
vi.mock('../../firebase/config', () => ({
  auth: {
    signOut: () => mockSignOut(),
  },
}));

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders logo link', () => {
    mockUseAuth.mockReturnValue({ currentUser: null });
    renderHeader();

    const logoLink = screen.getByRole('link', { name: /ai learning platform/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('shows navigation links when user is logged in', () => {
    mockUseAuth.mockReturnValue({ currentUser: { uid: '123' } });
    renderHeader();

    expect(screen.getByRole('link', { name: 'Learn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Portfolio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Analytics' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  test('does not show navigation links when user is not logged in', () => {
    mockUseAuth.mockReturnValue({ currentUser: null });
    renderHeader();

    expect(screen.queryByRole('link', { name: 'Learn' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Portfolio' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Profile' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Analytics' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Logout' })).not.toBeInTheDocument();
  });

  test('calls signOut when logout button is clicked', async () => {
    const user = userEvent.setup();
    mockUseAuth.mockReturnValue({ currentUser: { uid: '123' } });
    renderHeader();

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    await user.click(logoutButton);

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});