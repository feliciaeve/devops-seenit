import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WatchAndRateForm from './HistoryRating';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setDoc, doc } from 'firebase/firestore';

jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: jest.fn(),
}));

jest.mock('@/firebase', () => ({
    auth: {},
    db: {},
}));

jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    setDoc: jest.fn(),
    serverTimestamp: jest.fn(() => 'timestamp'),
}));

describe('WatchAndRateForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
});

const mockUser = { uid: '123' };

it('renders form with default values', () => {
    (useAuthState as jest.Mock).mockReturnValue([mockUser]);
    render(<WatchAndRateForm movieId="m1" movieTitle="Test Movie" />);

    expect(screen.getByText(/your review/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
});

it('submits the form and shows success message', async () => {
    (useAuthState as jest.Mock).mockReturnValue([mockUser]);

    render(<WatchAndRateForm movieId="m1" movieTitle="Test Movie" />);

    fireEvent.change(screen.getByLabelText(/rating/i), {
    target: { value: '8' },
    });

    fireEvent.change(screen.getByLabelText(/comment/i), {
    target: { value: 'Great movie!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
        expect(setDoc).toHaveBeenCalledTimes(2); // once on mount, once on submit
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
        });
    });

    it('does not submit if user is not logged in', () => {
        (useAuthState as jest.Mock).mockReturnValue([null]);

        render(<WatchAndRateForm movieId="m1" movieTitle="Test Movie" />);
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(setDoc).not.toHaveBeenCalled();
    });
});
