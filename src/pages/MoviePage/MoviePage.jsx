import React, { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviePage.modules.css";

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
          Authorization: "Bearer 94cd29df11b275cb6b8d8e1b45736796",
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
