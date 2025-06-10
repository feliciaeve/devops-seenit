import { render } from '@testing-library/react';
import LazyImage from './LazyImage';

describe('LazyImage', () => {
  it('renders image with correct alt text', () => {
    const { getByAltText } = render(
      <LazyImage alt="Test Image" src="/image.jpg" width={100} height={100} />
    );
    expect(getByAltText(/test image/i)).toBeInTheDocument();
  });
});
