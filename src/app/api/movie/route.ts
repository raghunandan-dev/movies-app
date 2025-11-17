import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import Movie from '../../../../models/movie';
import User from "../../models/User";
import { getUserId } from "../../lib/auth";

export async function POST(request: NextRequest) {
    try {
      await dbConnect();
      // Get user ID from NextAuth session
      const userId = await getUserId();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    
      // Get movie data from request
      const { title, description, imageUrl } = await request.json();
    
      // Create a new movie associated with the user
      const movie = await Movie.create({
        title,
        description,
        imageUrl,
        userId
      });
    
      return NextResponse.json({ movie });
    } catch (error) {
      console.error("Error creating movie:", error);
      return NextResponse.json(
        { error: "Failed to create movie" }, 
        { status: 500 }
      );
    }
}

// GET endpoint to fetch all movies for the authenticated user
export async function GET(request: NextRequest) {
    try {
      await dbConnect();
      // Get user ID from NextAuth session
      const userId = await getUserId();
      console.log("userId.....", userId);
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    
      // Fetch movies for the specific user
      const movies = await Movie.find({ userId })
        .sort({ createdAt: -1 })
        .lean();
    
      return NextResponse.json({ movies });
    } catch (error) {
      console.error("Error fetching movies:", error);
      return NextResponse.json(
        { error: "Failed to fetch movies" }, 
        { status: 500 }
      );
    }
}