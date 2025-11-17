

import Image from 'next/image';
import { getMovie } from "../../lib/movies/movie";
interface Movie {
    id: string;
    name: string;
    image: string;
    genres: { genre: { name: string } }[];
}

const MovieDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
    const { id } = await params; // ✅ unwrap the promise
    console.log("id is", id)
    const movie = await getMovie(id);

    // useEffect(() => {
    //     if (!id) return;

    //     console.log(`Fetching movie with id: ${id}`);

    //     axios.get(`/api/movie/${id}`)
    //         .then(response => setMovie(response.data))
    //         .catch(err => console.log(err));
    // }, [id]);
    console.log("movie",movie)
    if (!movie) return <div className="loading">Loading...</div>;

    return (
        <div className="movie-details-container">
            <h1>{movie?.name}</h1>
            <Image src={movie?.image} alt={movie?.name} width={500} height={300} className="movie-image" />
            <h2>Genres</h2>
            <ul className="genres-list">
                {/* {movie?.genres.map((genre, index) => (
                    <li key={index} className="genre-item">{genre.genre.name}</li>
                ))} */}
            </ul>
            
        </div>
    );
};

export default MovieDetailsPage;