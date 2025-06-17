import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from '../components/forms/SearchForm';
import { useRouter } from 'next/navigation';

// Mock debounce agar langsung dipanggil tanpa delay
jest.mock('@/lib/debounce', () => ({
    debounce: (fn: any) => fn,
}));

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('SearchForm component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
        mockPush.mockClear();
    });

    it('calls router.push with encoded search query on valid submit', async () => {
        render(<SearchForm />);
        const user = userEvent.setup();
        const input = screen.getByPlaceholderText(/search movies.../i);

        await user.type(input, 'Inception');
        fireEvent.submit(screen.getByTestId('search-form'));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/search?query=Inception');
        });
    });

    it('trims whitespace and encodes query before pushing', async () => {
        render(<SearchForm />);
        const user = userEvent.setup();
        const input = screen.getByPlaceholderText(/search movies.../i);

        await user.type(input, '   star wars  ');
        fireEvent.submit(screen.getByTestId('search-form'));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/search?query=star%20wars');
        });
    });
});
