import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage';

describe('ErrorMessage', () => {
    it('renders message and button', () => {
        const mockReset = jest.fn();
        render(<ErrorMessage message="Test error" reset={mockReset} />);

        expect(screen.getByText(/some thing went wrong/i)).toBeInTheDocument();
        expect(screen.getByText(/please try again later/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /try again/i }),
        ).toBeInTheDocument();
    });

    it('calls reset function when button is clicked', () => {
        const mockReset = jest.fn();
        render(<ErrorMessage message="Test error" reset={mockReset} />);

        fireEvent.click(screen.getByRole('button', { name: /try again/i }));
        expect(mockReset).toHaveBeenCalled();
    });
});
