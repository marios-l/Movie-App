import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type User = { name: string } | null;

export type AuthState = {
  user: User;
  loading: boolean;
  isAuthed: boolean;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("demo_user");
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);

  async function login(name: string, password: string) {
    const ok =
      (name === "admin" && password === "adminpass") ||
      (name === "test" && password === "testpass");
    if (!ok) throw new Error("Invalid credentials");
    const u = { name };
    setUser(u);
    localStorage.setItem("demo_user", JSON.stringify(u));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("demo_user");
  }

  const value = useMemo<AuthState>(
    () => ({ user, loading, isAuthed: !!user, login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
