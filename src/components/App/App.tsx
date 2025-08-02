
import css from './App.module.css';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { Movie } from '../../types/movie';
import { getMovies } from '../../services/movieService.ts';

import SearchBar from '../SearchBar/SearchBar.tsx'
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import Loader from '../Loader/Loader.tsx';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import MovieModal from '../MovieModal/MovieModal.tsx';

const notify = () => toast('No movies found for your request.');

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setLoading(true);
      setError(false);
      const newArticles = await getMovies(query);
      console.log(newArticles)
      if (newArticles.length === 0) {
        notify()
      }

      setMovies(newArticles)
    } catch {
      setError(true)
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    < div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  )
}