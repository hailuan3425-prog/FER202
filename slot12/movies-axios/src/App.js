import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import movieAPI from "./api/movieAPI";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await movieAPI.get("/movies");
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleCreate = async (movie) => {
    try {
      const response = await movieAPI.post("/movies", movie);
      setMovies(prev => [...prev, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await movieAPI.delete(`/movies/${id}`);
      setMovies(prev => prev.filter(movie => movie.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>🎬 Movie Manager</h1>
      <MovieForm onSubmit={handleCreate} />
      <MovieList movies={movies} onDelete={handleDelete} />
    </Container>
  );
}

export default App;