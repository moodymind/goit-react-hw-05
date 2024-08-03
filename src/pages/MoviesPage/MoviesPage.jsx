import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query === "") return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: { query, include_adult: false, language: "en-US", page: 1 },
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGNkMjlkZjExYjI3NWNiNmI4ZDhlMWI0NTczNjc5NiIsIm5iZiI6MTcyMjQzNjU1MS45NDYxMSwic3ViIjoiNjZhYTE4YWM3MjMyZDFmMTMyY2QyY2U4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gcy0-AcHUdN51z2KLncLAcAX9KjgMRkhQtNPNZBKa-Y",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const newQuery = form.query.value.trim();
    if (newQuery) {
      setSearchParams({ query: newQuery });
    } else {
      searchParams({});
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search your perfect movie..."
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
