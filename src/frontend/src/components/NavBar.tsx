import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useIsAdmin } from "@/hooks/useQueries";
import { Link, useRouter } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, Shield, Users } from "lucide-react";

export function NavBar() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const isAuthenticated = !!identity;
  const router = useRouter();

  const handleLogout = () => {
    clear();
    router.navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" data-ocid="nav.link">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Safe Storage
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            data-ocid="nav.link"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-ocid="nav.link"
            >
              Dashboard
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-ocid="nav.link"
            >
              Admin
            </Link>
          )}
          <Link
            to="/privacy"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            data-ocid="nav.link"
          >
            Privacy
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden text-muted-foreground hover:text-foreground sm:flex"
              >
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-1.5 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hidden text-muted-foreground hover:text-foreground sm:flex"
                >
                  <Link to="/admin">
                    <Users className="mr-1.5 h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                data-ocid="nav.button"
              >
                <LogOut className="mr-1.5 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                className="border-primary/50 text-primary hover:bg-primary/10"
                data-ocid="nav.button"
              >
                {isLoggingIn ? "Connecting..." : "Log In"}
              </Button>
              <Button
                size="sm"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="nav.primary_button"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
