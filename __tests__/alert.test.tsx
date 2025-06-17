// components/ui/Alert.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';

describe('Alert component', () => {
    it('renders default variant correctly', () => {
        render(
            <Alert data-testid="alert">
                <AlertTitle>Test Title</AlertTitle>
                <AlertDescription>This is a test description.</AlertDescription>
            </Alert>,
        );

        const alert = screen.getByTestId('alert');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveClass('bg-background text-foreground');
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(
            screen.getByText('This is a test description.'),
        ).toBeInTheDocument();
    });

    it('renders destructive variant correctly', () => {
        render(
            <Alert variant="destructive" data-testid="alert-destructive">
                <AlertTitle>Danger!</AlertTitle>
                <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>,
        );

        const alert = screen.getByTestId('alert-destructive');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveClass('text-destructive');
        expect(screen.getByText('Danger!')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    });

    it('applies custom className correctly', () => {
        render(
            <Alert className="custom-alert" data-testid="alert-custom">
                Custom Alert
            </Alert>,
        );

        const alert = screen.getByTestId('alert-custom');
        expect(alert).toHaveClass('custom-alert');
    });
});
