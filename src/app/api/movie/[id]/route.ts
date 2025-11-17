import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import Movie from '../../../../../models/movie';
import { getUserId } from "../../../lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
      await dbConnect();
    
      // Get userId from NextAuth session
      const userId = await getUserId();
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // Find movie by ID and ensure it belongs to the user
      const movie = await Movie.findOne({ 
        _id: params.id,
        userId: userId
      }).lean();
    
      if (!movie) {
        return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
      }
    
      return NextResponse.json({ movie });
    } catch (error) {
    
      console.error("Error fetching movie:", error);
      return NextResponse.json({ error: 'Failed to fetch movie' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
      const body = await request.json();
      await dbConnect();
    
      // Get userId from token
      const userId = await getUserIdFromToken(request);
    
      // Find and update the movie, ensuring it belongs to the user
      const updatedMovie = await Movie.findOneAndUpdate(
        { _id: params.id, userId: userId },
        { ...body, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    
      if (!updatedMovie) {
        return NextResponse.json({ error: 'Movie not found or unauthorized' }, { status: 404 });
      }
    
      return NextResponse.json({ movie: updatedMovie });
    } catch (error) {
    
      console.error("Error updating movie:", error);
      return NextResponse.json({ error: 'Failed to update movie' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
      await dbConnect();
    
      // Get userId from NextAuth session
      const userId = await getUserId();
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    
      // Find and delete the movie, ensuring it belongs to the user
      const deletedMovie = await Movie.findOneAndDelete({ 
        _id: params.id,
        userId: userId
      });
    
      if (!deletedMovie) {
        return NextResponse.json({ error: 'Movie not found or unauthorized' }, { status: 404 });
      }
    
      return NextResponse.json({ message: 'Movie deleted successfully' });
    } catch (error) {
    
      console.error("Error deleting movie:", error);
      return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
    }
}
