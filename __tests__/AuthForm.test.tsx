import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from '../components/AuthForm';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
}));
jest.mock('@/firebase', () => ({
    auth: {},
}));

jest.mock(
    '../components/SuccessToast',
    () =>
        ({ message }: { message: string }) =>
            <div>{message}</div>,
);

describe('AuthForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders login form by default', () => {
        render(<AuthForm />);
        expect(
            screen.getByRole('heading', { name: /login/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/enter your email/i),
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/enter your password/i),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /login/i }),
        ).toBeInTheDocument();
    });

    it('switches to register form when clicking switch button', () => {
        render(<AuthForm />);
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(
            screen.getByRole('heading', { name: /register/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /register/i }),
        ).toBeInTheDocument();
    });

    it('shows success message on successful login', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({});
        render(<AuthForm />);

        fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(signInWithEmailAndPassword).toHaveBeenCalled();
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
            expect.anything(),
            'test@example.com',
            'password123',
        );
        expect(
            await screen.findByText(/login successful!/i),
        ).toBeInTheDocument();
    });

    it('shows success message on successful registration', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({});
        render(<AuthForm />);
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
            target: { value: 'new@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
            target: { value: 'newpass123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
            expect.anything(),
            'new@example.com',
            'newpass123',
        );
        expect(
            await screen.findByText(/registration successful!/i),
        ).toBeInTheDocument();
    });

    it('shows error message on login failure', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
            message: 'Login failed!',
        });
        render(<AuthForm />);

        fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
            target: { value: 'fail@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
            target: { value: 'failpass' },
        });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(await screen.findByText(/login failed!/i)).toBeInTheDocument();
    });
});
