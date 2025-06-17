import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from '../components/Logout';

jest.mock('firebase/auth', () => ({
    signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: jest.fn(),
    }),
}));

jest.mock('@/firebase', () => ({
    auth: {},
}));

describe('LogoutButton', () => {
    it('calls signOut and refresh on click', async () => {
        const { signOut } = require('firebase/auth');
        render(<LogoutButton />);
        fireEvent.click(screen.getByRole('button', { name: /logout/i }));
        expect(signOut).toHaveBeenCalled();
    });
});
