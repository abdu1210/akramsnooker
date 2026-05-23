import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteLogo } from "@/components/site/SiteLogo";
import {
  checkStaffCredentials,
  isStaffAuthenticated,
  setStaffAuthenticated,
} from "@/lib/staff-auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Staff Log in — Akram Snooker" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isStaffAuthenticated()) {
      navigate({ to: "/staff" });
    }
  }, [navigate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (checkStaffCredentials(username.trim(), password)) {
      setStaffAuthenticated();
      navigate({ to: "/staff" });
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 glow-felt">
        <div className="flex flex-col items-center mb-8">
          <SiteLogo size="lg" />
          <h1 className="mt-4 font-display text-2xl font-bold">Log in</h1>
          <p className="mt-1 text-sm text-muted-foreground text-center">Staff table billing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full font-semibold">
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
