/**
 * Movie model for the application
 * 
 * @interface IMovie - Interface for Movie document
 * @property {string} name - The name of the movie
 * @property {string} image - URL or path to the movie image
 * @property {Array} genres - Array of genre objects associated with the movie
 * @property {string} userId - Reference to the User who added the movie
 * 
 * @const MovieSchema - Mongoose schema for Movie model
 */
import mongoose, { Schema, Document, model } from "mongoose";

interface IMovie extends Document {
    name: string;
    image: string;
    genres: { genre: { name: string }}[];
    // 👇 Add a reference to User,
    userId: string;
}

const MovieSchema:Schema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    genres: [{genre: {name: String, }}],
    // 👇 Add a reference to User
    userId: { type: Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.models.Movie || model<IMovie>('Movie', MovieSchema);