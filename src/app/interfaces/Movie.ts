export interface IMovie extends Document {
    name: string;
    image: string;
    genres: { genre: { name: string }}[];
}