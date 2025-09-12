import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import MovieDetails from '../pages/MovieDetails';

const router = createBrowserRouter([
  { path: '/', element: <SearchPage /> },
  { path: '/movie/:id', element: <MovieDetails /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
