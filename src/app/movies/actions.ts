'use server';
// import { } from "next/server";

import dbconnect from "../../utils/db";
import Movie from "../models/Movie";
import { NextResponse } from "next/server";

export const create = async(formData: FormData) => {
    const name = formData.get("name");
    const image = formData.get("image");
    console.log('Server Action:', name, image);
    await dbconnect();
    const newMovie = new Movie({name, image, genres: []});
    await newMovie.save();
    return { success: true, data: newMovie.toObject() };
}