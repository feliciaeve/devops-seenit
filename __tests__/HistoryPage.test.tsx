import { render, screen } from '@testing-library/react';
import HistoryPage from '../components/HistoryPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as firestore from 'firebase/firestore';

jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: jest.fn(),
}));
jest.mock('@/firebase', () => ({
    auth: {},
    db: {},
}));
jest.mock('firebase/firestore');

describe('HistoryPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows login message when user is not logged in', () => {
        (useAuthState as jest.Mock).mockReturnValue([null]);
        render(<HistoryPage />);
        expect(screen.getByText(/please log in/i)).toBeInTheDocument();
    });

    it('shows loading when user is logged in but data is loading', () => {
        (useAuthState as jest.Mock).mockReturnValue([{}]);
        (firestore.getDocs as jest.Mock).mockResolvedValue({ docs: [] });

        render(<HistoryPage />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
});
