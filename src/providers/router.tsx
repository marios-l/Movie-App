import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import MovieDetails from '../pages/MovieDetails';
import ProtectedRoute from '../auth/ProtectedRoute';
import Login from '../pages/Auth/Login';
import NotFound from '../pages/NotFound';
import App from '../App';
import FavoritesPage from '../pages/Favorites';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/', element: <SearchPage /> },
          { path: '/movie/:id', element: <MovieDetails /> },
          { path: '/favorites', element: <FavoritesPage /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
