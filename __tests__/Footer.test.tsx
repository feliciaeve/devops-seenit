import { render, screen } from '@testing-library/react';
import Footer from '../components/layout/Footer';

describe('Footer component', () => {
    it('renders the footer text correctly', () => {
        render(<Footer />);
        const footerText = screen.getByText(/© 2025 Movie App/i);
        expect(footerText).toBeInTheDocument();
    });

    it('has correct styling classes', () => {
        render(<Footer />);
        const div = screen.getByText(/© 2025 Movie App/i).parentElement;
        expect(div).toHaveClass('mt-10');
        expect(div).toHaveClass('border-t');
        expect(div).toHaveClass('py-3');
        expect(div).toHaveClass('text-center');
    });
});
