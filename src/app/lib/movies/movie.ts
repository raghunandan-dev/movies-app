import { NextResponse } from "next/server";
import dbConnect from '../../../utils/db';
import Movie from '../../models/Movie';


export async function getMovie(id: string){
    await dbConnect();
    const movie = await Movie.findById(id);
    // console.log("movie",movie)
    // if(!movie){
    //     return NextResponse.json({message: `Movie not found with id: ${id}`}, {status: 404});
    // }
    return movie;
}