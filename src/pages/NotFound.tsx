import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div style={{ padding: 16 }}>
      <h1>404</h1>
      <p>Not found.</p>
      <Link to="/">Go home</Link>
    </div>
  );
}
