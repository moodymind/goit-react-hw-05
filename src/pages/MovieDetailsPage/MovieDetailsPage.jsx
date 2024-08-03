import React, { useEffect, useState, useRef } from "react";
import {
  useParams,
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
  NavLink,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";

const fetchMovieDetails = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGNkMjlkZjExYjI3NWNiNmI4ZDhlMWI0NTczNjc5NiIsIm5iZiI6MTcyMjQzNjU1MS45NDYxMSwic3ViIjoiNjZhYTE4YWM3MjMyZDFmMTMyY2QyY2U4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gcy0-AcHUdN51z2KLncLAcAX9KjgMRkhQtNPNZBKa-Y",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = useRef(location.state?.from);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (previousLocation.current) {
      navigate(previousLocation.current);
    } else {
      navigate("/movies");
    }
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack}>Go Back</button>
      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <nav>
        <NavLink
          to="cast"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Cast
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
