import { useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Movies() {
    const [movies, setMovies] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const limit = e.target.limit.value || 5;
        try {
            const response = await fetch(
                `/api/movies/get?title=${title}&limit=${limit}`
            );
            const data = await response.json();
            setMovies(data);
            console.log(data)
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="title"
                    placeholder="search Title..."
                    className={styles.input}
                />
                <input
                    type="number"
                    name="limit"
                    placeholder="limit"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Search
                </button>
            </form>
            <ul className={styles.movies}>
                {movies.map((movie) => (
                    <li key={movie._id} className={styles.movie}>
                        <h2 className={styles.title}>{movie.title}</h2>
                        <h3 className={styles.metacritic}>
                            {movie.metacritic}
                        </h3>
                        <p className={styles.plot}>{movie.plot}</p>
                        <p className={styles.rating}>{movie.imdb.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// export async function getServerSideProps(){
//     try {
//         const client = await clientPromise;
//         const db = client.db("sample_mflix")
//
//         const movies = await db
//             .collection("movies")
//             .find({})
//             .sort({metacritic: -1})
//             .limit(20)
//             .toArray()
//
//
//         return {
//             props: { movies: JSON.parse(JSON.stringify(movies))}
//         };
//     } catch(e) {
//         console.error(e)
//     }
// }
