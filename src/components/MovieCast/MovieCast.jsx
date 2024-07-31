import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGNkMjlkZjExYjI3NWNiNmI4ZDhlMWI0NTczNjc5NiIsIm5iZiI6MTcyMjQzNjU1MS45NDYxMSwic3ViIjoiNjZhYTE4YWM3MjMyZDFmMTMyY2QyY2U4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gcy0-AcHUdN51z2KLncLAcAX9KjgMRkhQtNPNZBKa-Y",
          },
        }
      );
      setCast(response.data.cast);
    };
    fetchCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.cast_id}>
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
