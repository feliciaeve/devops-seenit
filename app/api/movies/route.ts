import { NextResponse } from 'next/server';
import { getMovies } from '@/actions/movies';

export async function GET() {
    try {
        const movies = await getMovies(1);
        return NextResponse.json({ results: movies });
    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch movies' },
            { status: 500 },
        );
    }
}
