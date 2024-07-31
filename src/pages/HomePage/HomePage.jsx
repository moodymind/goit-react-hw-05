import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.modules.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day",
        {
          headers: {
            Authorization: "Bearer 94cd29df11b275cb6b8d8e1b45736796",
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
