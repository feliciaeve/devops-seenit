import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from './AuthForm';

// Mock Firebase auth functions
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

// Mock firebase auth object
jest.mock('@/firebase', () => ({
  auth: {},
}));

// Mock SuccessToast
jest.mock('./SuccessToast', () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => (
    <div data-testid="success-toast">{message}</div>
  ),
}));

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form by default', () => {
    render(<AuthForm />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  it('switches to register form when toggle is clicked', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });

  it('submits login form successfully', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({});
    render(<AuthForm />);
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        {},
        'test@example.com',
        'password'
      )
    );
    expect(await screen.findByTestId('success-toast')).toHaveTextContent(
      /login successful/i
    );
  });

  it('submits register form successfully', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({});
    render(<AuthForm />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() =>
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        {},
        'test@example.com',
        'password'
      )
    );
    expect(await screen.findByTestId('success-toast')).toHaveTextContent(
      /registration successful/i
    );
  });
});
