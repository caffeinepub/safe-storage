import { Link } from "@tanstack/react-router";
import { AlertTriangle, Instagram, MessageCircle, Shield } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="mt-20 border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-display font-bold text-foreground">
                Safe Storage
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Zero-knowledge encrypted file storage. Your data, your keys.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-foreground transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Founders */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Founders
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mr. Adhikari Chandra Kiran</li>
              <li>Mr. Adhikari Poorna Sai Srinivas</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://wa.me/917013131869"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-green-500" />
                  <span>+91 70131 31869</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/ackiran1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <span>@ackiran1</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/vasupro7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <span>@vasupro7</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Cybercrime Notice */}
        <div className="mt-8 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Report Cybercrime:</strong>{" "}
              Safe Storage is committed to a safe digital environment. If you
              encounter any cybercrime, fraud, or online abuse, report it
              immediately at the National Cyber Crime Reporting Portal:{" "}
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-yellow-500 hover:underline"
              >
                cybercrime.gov.in
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {year} Safe Storage. All rights reserved.</p>
          <p>
            Built with ❤ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
