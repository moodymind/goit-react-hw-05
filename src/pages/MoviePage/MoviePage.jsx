import React, { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviePage.module.css";

const MoviePage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: { query, include_adult: false, language: "en-US", page: 1 },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGNkMjlkZjExYjI3NWNiNmI4ZDhlMWI0NTczNjc5NiIsIm5iZiI6MTcyMjQzNjU1MS45NDYxMSwic3ViIjoiNjZhYTE4YWM3MjMyZDFmMTMyY2QyY2U4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gcy0-AcHUdN51z2KLncLAcAX9KjgMRkhQtNPNZBKa-Y",
        },
      }
    );
    setMovies(response.data.results);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your perfect movie..."
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviePage;
