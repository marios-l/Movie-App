import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import MovieDetails from '../pages/MovieDetails';
import ProtectedRoute from '../auth/ProtectedRoute';
import Login from '../pages/Auth/Login';
import NotFound from '../pages/NotFound';
import App from '../App';

const router = createBrowserRouter([
  {
    element: <App />,        // top-level layout (header, etc.)
    errorElement: <NotFound />,
    children: [
      { path: "/login", element: <Login /> },
      {
        element: <ProtectedRoute />, // everything below requires login
        children: [
          { path: '/', element: <SearchPage /> },
          { path: '/movie/:id', element: <MovieDetails /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
