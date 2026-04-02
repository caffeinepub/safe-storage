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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useSaveProfile } from "@/hooks/useQueries";
import { useRouter } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const { login, identity, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const {
    mutate: saveProfile,
    isPending,
    isSuccess,
    isError,
    error,
  } = useSaveProfile();
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    terms?: string;
  }>({});
  const [step, setStep] = useState<"auth" | "profile">("auth");

  useEffect(() => {
    if (identity && step === "auth") {
      setStep("profile");
    }
  }, [identity, step]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account created! Welcome to Safe Storage.");
      router.navigate({ to: "/dashboard" });
    }
  }, [isSuccess, router]);

  const validate = () => {
    const errors: typeof formErrors = {};
    if (!displayName.trim()) errors.name = "Display name is required";
    if (!email.trim() || !email.includes("@"))
      errors.email = "Valid email is required";
    if (!agreedToTerms)
      errors.terms =
        "You must agree to the Terms of Service and Privacy Policy";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    saveProfile({
      displayName: displayName.trim(),
      email: email.trim(),
      agreedToTerms,
    });
  };

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
              Create Account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Join Safe Storage — your encrypted vault awaits
            </p>
          </div>

          <Card
            className="border-border/50 bg-card/80 backdrop-blur"
            data-ocid="register.modal"
          >
            <CardHeader>
              <CardTitle className="text-foreground">
                {step === "auth"
                  ? "Step 1: Verify Identity"
                  : "Step 2: Your Profile"}
              </CardTitle>
              <CardDescription>
                {step === "auth"
                  ? "Connect via Internet Identity to get started."
                  : "Tell us a bit about yourself."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "auth" ? (
                <div className="space-y-4">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                    onClick={login}
                    disabled={isLoggingIn || isInitializing}
                    data-ocid="register.submit_button"
                  >
                    {isLoggingIn || isInitializing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Connect with Internet Identity"
                    )}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary hover:underline"
                      data-ocid="register.link"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isError && (
                    <div
                      className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                      data-ocid="register.error_state"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {(error as Error)?.message ?? "Failed to save profile"}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="displayName" className="text-foreground">
                      Display Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your full name"
                        className="pl-9"
                        data-ocid="register.input"
                      />
                    </div>
                    {formErrors.name && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="register.error_state"
                      >
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-9"
                        data-ocid="register.input"
                      />
                    </div>
                    {formErrors.email && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="register.error_state"
                      >
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(v) => setAgreedToTerms(!!v)}
                        data-ocid="register.checkbox"
                      />
                      <Label
                        htmlFor="terms"
                        className="cursor-pointer text-sm text-muted-foreground leading-relaxed"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {formErrors.terms && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="register.error_state"
                      >
                        {formErrors.terms}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                    disabled={isPending}
                    data-ocid="register.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Create My Account
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
