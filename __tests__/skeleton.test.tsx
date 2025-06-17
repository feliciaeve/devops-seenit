import { render } from '@testing-library/react';
import { Skeleton } from '../components/ui/skeleton';

describe('Skeleton component', () => {
    it('renders correctly with default class', () => {
        const { container } = render(<Skeleton />);
        const div = container.firstChild as HTMLDivElement;

        expect(div).toBeInTheDocument();
        expect(div).toHaveClass('animate-pulse');
        expect(div).toHaveClass('rounded-md');
        expect(div).toHaveClass('bg-muted');
    });

    it('applies custom class names', () => {
        const { container } = render(<Skeleton className="w-32 h-4" />);
        const div = container.firstChild as HTMLDivElement;

        expect(div).toHaveClass('w-32');
        expect(div).toHaveClass('h-4');
        expect(div).toHaveClass('animate-pulse');
    });

    it('spreads additional props', () => {
        const { container } = render(
            <Skeleton id="skeleton-test" data-testid="skeleton" />,
        );
        const div = container.firstChild as HTMLDivElement;

        expect(div).toHaveAttribute('id', 'skeleton-test');
        expect(div).toHaveAttribute('data-testid', 'skeleton');
    });
});
