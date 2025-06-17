import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ErrorComponent from '../app/movies/[id]/error';

jest.mock('@/components/ErrorMessage', () => ({ message, reset }: any) => (
    <>
        <div>{message}</div>
        <button onClick={reset}>Reset</button>
    </>
));

describe('ErrorComponent', () => {
    const mockError = new Error('test error message');
    const mockReset = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders ErrorMessage with correct message and reset function', () => {
        render(<ErrorComponent error={mockError} reset={mockReset} />);

        expect(screen.getByText(/test error message/i)).toBeInTheDocument();

        const resetButton = screen.getByRole('button');
        expect(resetButton).toBeInTheDocument();

        fireEvent.click(resetButton);
        expect(mockReset).toHaveBeenCalledTimes(1);
    });
});
