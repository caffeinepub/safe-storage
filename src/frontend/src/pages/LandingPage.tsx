import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useRouter } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronRight,
  Download,
  Eye,
  FileCheck,
  Lock,
  Shield,
  Star,
  Upload,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Lock,
    title: "Zero-Knowledge Encryption",
    desc: "Files are encrypted with AES-256 in your browser before upload. Even we cannot read your data.",
  },
  {
    icon: Shield,
    title: "Two-Factor Auth",
    desc: "Secure login via Internet Identity with cryptographic verification — no passwords stored.",
  },
  {
    icon: Eye,
    title: "Audit Logs",
    desc: "Every file access is logged on-chain. Full transparency with immutable records.",
  },
  {
    icon: FileCheck,
    title: "GDPR Compliant",
    desc: "Built in compliance with GDPR principles and India's IT Act for data protection.",
  },
];

const demoFiles = [
  {
    name: "Q4_Financial_Report.pdf",
    size: "2.4 MB",
    date: "Mar 28, 2026",
    starred: true,
  },
  {
    name: "Project_Blueprint_v3.docx",
    size: "856 KB",
    date: "Mar 25, 2026",
    starred: false,
  },
  {
    name: "Team_Photos_2026.zip",
    size: "18.2 MB",
    date: "Mar 20, 2026",
    starred: true,
  },
  {
    name: "SecureBackup_2026-03.tar.gz",
    size: "5.1 GB",
    date: "Mar 15, 2026",
    starred: false,
  },
];

export default function LandingPage() {
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const router = useRouter();
  const isAuthenticated = !!identity;

  const handleCTA = () => {
    if (isAuthenticated) {
      router.navigate({ to: "/dashboard" });
    } else {
      login();
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 border-primary/30 bg-primary/10 text-primary">
              <Lock className="mr-1.5 h-3 w-3" />
              MILITARY-GRADE ENCRYPTION
            </Badge>
            <h1 className="font-display mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your Files.
              <br />
              <span className="text-primary">Encrypted.</span>
              <br />
              <span className="text-secondary">Secured.</span>
            </h1>
            <p className="mb-8 max-w-md text-lg text-muted-foreground">
              Safe Storage uses client-side AES-256 encryption so your files are
              locked before they ever leave your device. Zero-knowledge, truly
              private.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={handleCTA}
                disabled={isLoggingIn}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow-gold font-semibold"
                data-ocid="landing.primary_button"
              >
                {isLoggingIn ? "Connecting..." : "Start Storing Securely"}
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary/40 text-primary hover:bg-primary/10"
                data-ocid="landing.secondary_button"
              >
                <Link to="/privacy">View Privacy Policy</Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" />
                AES-256 Encrypted
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-primary" />
                Zero-Knowledge
              </div>
              <div className="flex items-center gap-1.5">
                <FileCheck className="h-4 w-4 text-primary" />
                GDPR Ready
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <img
              src="/assets/generated/security-hero-transparent.dim_520x480.png"
              alt="Secure encrypted storage illustration"
              className="w-full max-w-md drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Cybercrime Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-6 py-4"
        >
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-500/15 text-yellow-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Protecting You Against Cybercrime
              </p>
              <p className="text-sm text-muted-foreground">
                Safe Storage is dedicated to your digital safety. If you ever
                encounter online fraud, cyber harassment, or any cybercrime,
                report it immediately to the Government of India's National
                Cyber Crime Reporting Portal:{" "}
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-yellow-500 hover:underline"
                >
                  cybercrime.gov.in
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Upload Zone Preview */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-foreground">
            Secure File Upload
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Drag &amp; drop or browse — encrypted instantly in your browser
          </p>
          <Card className="border-2 border-dashed border-primary/30 bg-card/50">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-glow">
                <Shield className="h-8 w-8" />
              </div>
              <p className="mb-2 text-lg font-semibold text-foreground">
                Drop files to encrypt &amp; upload
              </p>
              <p className="mb-6 text-sm text-muted-foreground">
                AES-256 encrypted before leaving your device
              </p>
              <Button
                onClick={handleCTA}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="landing.upload_button"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isAuthenticated ? "Go to Dashboard" : "Sign In to Upload"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* File Explorer Preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-foreground">
            File Explorer Dashboard
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Manage all your encrypted files from one clean interface
          </p>
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur">
            <div className="flex min-h-[360px]">
              {/* Sidebar */}
              <aside className="hidden w-48 shrink-0 flex-col border-r border-border/50 bg-card/80 p-4 sm:flex">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  My Files
                </p>
                <nav className="space-y-1">
                  {["All Files", "Recent", "Starred"].map((item) => (
                    <div
                      key={item}
                      className={`flex cursor-default items-center gap-2 rounded-md px-3 py-2 text-sm ${item === "All Files" ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}
                    >
                      <FileCheck className="h-3.5 w-3.5" />
                      {item}
                    </div>
                  ))}
                </nav>
                <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Admin Panel
                </p>
                <nav className="space-y-1">
                  {["Users", "Settings"].map((item) => (
                    <div
                      key={item}
                      className="flex cursor-default items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground"
                    >
                      <Users className="h-3.5 w-3.5" />
                      {item}
                    </div>
                  ))}
                </nav>
              </aside>
              {/* File list */}
              <main className="flex-1 p-6">
                <div className="space-y-3">
                  {demoFiles.map((file, i) => (
                    <div
                      key={file.name}
                      className="flex items-center gap-4 rounded-lg border border-border/50 bg-accent/30 px-4 py-3"
                      data-ocid={`files.item.${i + 1}`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Lock className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {file.size} · {file.date}
                        </p>
                      </div>
                      {file.starred && (
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                      )}
                      <div className="flex gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-xs text-primary hover:bg-primary/10"
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Security Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-foreground">
            Security &amp; Trust
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Enterprise-grade security accessible to everyone
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full border-border/50 bg-card/60 backdrop-blur transition-all duration-200 hover:border-primary/40 hover:shadow-glow">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
