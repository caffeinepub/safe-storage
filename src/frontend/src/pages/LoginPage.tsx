import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useRouter } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AlertCircle, Loader2, Lock, Shield } from "lucide-react";
import { useEffect } from "react";

export default function LoginPage() {
  const {
    login,
    isLoggingIn,
    isLoginError,
    loginError,
    isInitializing,
    identity,
  } = useInternetIdentity();
  const router = useRouter();

  useEffect(() => {
    if (identity) {
      router.navigate({ to: "/dashboard" });
    }
  }, [identity, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-glow">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to access your encrypted vault
            </p>
          </div>

          <Card
            className="border-border/50 bg-card/80 backdrop-blur"
            data-ocid="login.modal"
          >
            <CardHeader>
              <CardTitle className="text-center text-lg text-foreground">
                Secure Login
              </CardTitle>
              <CardDescription className="text-center">
                We use Internet Identity for cryptographic authentication — no
                passwords stored.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoginError && (
                <div
                  className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  data-ocid="login.error_state"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {loginError?.message ?? "Login failed. Please try again."}
                </div>
              )}

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                size="lg"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                data-ocid="login.submit_button"
              >
                {isLoggingIn || isInitializing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isInitializing ? "Initializing..." : "Connecting..."}
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Sign In with Internet Identity
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                No account yet?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline"
                  data-ocid="login.link"
                >
                  Create one
                </Link>
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <Link
              to="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <span>·</span>
            <Link
              to="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
