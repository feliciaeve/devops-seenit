import { render, screen } from '@testing-library/react';
import LoginGuard from '../components/LoginGuard';
import { onAuthStateChanged } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
    onAuthStateChanged: jest.fn(),
}));
jest.mock('@/firebase', () => ({
    auth: {},
}));
jest.mock('../components/AuthForm', () => ({
    __esModule: true,
    default: () => <div>Auth Form</div>,
}));

describe('LoginGuard', () => {
    it('shows loading initially', () => {
        (onAuthStateChanged as jest.Mock).mockImplementation((_auth, cb) => {
            cb(undefined);
            return jest.fn();
        });

        render(<LoginGuard>Private Content</LoginGuard>);
        expect(screen.getByText(/checking login status/i)).toBeInTheDocument();
    });

    it('shows auth form if not logged in', () => {
        (onAuthStateChanged as jest.Mock).mockImplementation((_auth, cb) => {
            cb(null);
            return jest.fn();
        });

        render(<LoginGuard>Private Content</LoginGuard>);
        expect(screen.getByText(/auth form/i)).toBeInTheDocument();
    });

    it('shows children if logged in', () => {
        (onAuthStateChanged as jest.Mock).mockImplementation((_auth, cb) => {
            cb({ uid: '123' });
            return jest.fn();
        });

        render(<LoginGuard>Private Content</LoginGuard>);
        expect(screen.getByText(/private content/i)).toBeInTheDocument();
    });
});
