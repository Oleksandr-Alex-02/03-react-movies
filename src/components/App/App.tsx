
import css from './App.module.css';

import { useState } from 'react';
import { Movie } from '../../types/movie';
import { getMovies } from '../../services/movieServices.ts';

import SearchBar from '../SearchBar/SearchBar.tsx'
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import Loader from '../Loader/Loader.tsx';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';

// import toast, { Toaster } from 'react-hot-toast';
// const notify = () => toast('No movies found for your request.');

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setLoading(true);
      setError(false);
      const newArticles = await getMovies(query);

      console.log(newArticles)

      setMovies(newArticles)
    } catch {
      setError(true)
    } finally {
      setLoading(false);
    }
  };

  return (
    < div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 ? <MovieGrid movies={movies} /> : <p>No movies found for your request.</p>}
    </div>
  )
}