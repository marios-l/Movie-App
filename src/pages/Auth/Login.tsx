import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// location.state is typed as unknown in router
//getRedirectPath({ from: { pathname: "/home" } });
// -> "/home"

//getRedirectPath({}); 
// -> null

//getRedirectPath("random string"); 
// -> null

function getRedirectPath(state: unknown): string | null {
  if (state && typeof state === "object" && "from" in state) {
    const from = (state as { from?: unknown }).from;
    if (from && typeof from === "object" && "pathname" in from) {
      const pathname = (from as { pathname?: unknown }).pathname;
      if (typeof pathname === "string") return pathname;
    }
  }
  return null;
}

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("adminpass");
  const [err, setErr] = useState<string | null>(null);

  const nav = useNavigate();
  const location = useLocation();

  const fromPath = getRedirectPath(location.state) ?? "/";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await login(email, password);
      nav(fromPath, { replace: true });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Login failed");
    }
  }

  return (
    <div style={{ padding: 16, maxWidth: 360 }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label>
          <input
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        {err && <p style={{ color: "crimson" }}>{err}</p>}
        <button>Sign in</button>
      </form>
    </div>
  );
}
