import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";

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
    <Card.Root as="form" marginInline="auto" mt={12} maxW="sm" shadow="xl" onSubmit={onSubmit}>
      <Card.Header>
        <Card.Title>Login in</Card.Title>
        <Card.Description>Login in to search for movies</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input value={email} onChange={(ev) => setEmail(ev.target.value)} />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </Field.Root>
        </Stack>
        {err && <Text mt={2} color="firebrick">{err}</Text>}
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button type="submit" variant="solid">
          Sign in
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
