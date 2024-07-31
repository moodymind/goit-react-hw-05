import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  useParams,
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.modules.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/${movieId",
        {
          headers: {
            Authorization: "Bearer 94cd29df11b275cb6b8d8e1b45736796",
          },
        }
      );
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [movieId]);

  const goBack = () => {
    navigate(location.state?.from || "/movie");
  };

  if (!movie) return null;

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
      <nav>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
