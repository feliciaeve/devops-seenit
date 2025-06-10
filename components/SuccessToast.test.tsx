import { render, screen } from '@testing-library/react';
import SuccessToast from './SuccessToast';

describe('SuccessToast', () => {
  it('displays the success message', () => {
    render(<SuccessToast message="Success!" />);
    expect(screen.getByText(/success!/i)).toBeInTheDocument();
  });
});