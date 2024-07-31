import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGNkMjlkZjExYjI3NWNiNmI4ZDhlMWI0NTczNjc5NiIsIm5iZiI6MTcyMjQzNjU1MS45NDYxMSwic3ViIjoiNjZhYTE4YWM3MjMyZDFmMTMyY2QyY2U4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gcy0-AcHUdN51z2KLncLAcAX9KjgMRkhQtNPNZBKa-Y",
          },
        }
      );
      setMovies(response.data.results);
    };
    fetchTrendingMovies();
  });

  return (
    <div>
      <h1>Trending movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
