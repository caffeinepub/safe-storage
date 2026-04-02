import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Link } from "@tanstack/react-router";
import { FileCheck } from "lucide-react";
import { motion } from "motion/react";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <FileCheck className="h-7 w-7" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Terms of Service
            </h1>
            <p className="mt-2 text-muted-foreground">
              Effective: March 29, 2026
            </p>
          </div>

          <div className="space-y-6 text-foreground">
            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                Agreement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service constitute a legally binding agreement
                between you ("User") and Safe Storage ("Service"), owned and
                operated by Mr. Adhikari Chandra Kiran and Mr. Adhikari Poorna
                Sai Srinivas. By using Safe Storage, you agree to these terms in
                full. If you disagree, please discontinue use of the service.
              </p>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                A. User Responsibility
              </h2>
              <p className="mb-3 text-muted-foreground leading-relaxed">
                By using Safe Storage, you agree not to:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Upload illegal, malicious, harmful, or copyrighted material without proper authorization.",
                  "Attempt to breach, circumvent, or reverse-engineer the security protocols or encryption of the application.",
                  "Share your account credentials or encryption keys with unauthorized parties.",
                  "Use the service for any unlawful purpose or in violation of applicable laws.",
                  "Engage in any activity that may disrupt or impair the service's infrastructure.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                B. Ownership & Intellectual Property
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The "Safe Storage" application, its branding, design, and source
                code are the intellectual property of the founders:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  <strong className="text-foreground">
                    Mr. Adhikari Chandra Kiran
                  </strong>{" "}
                  — Co-Founder & Lead Visionary
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  <strong className="text-foreground">
                    Mr. Adhikari Poorna Sai Srinivas
                  </strong>{" "}
                  — Co-Founder & Technical Partner
                </li>
              </ul>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                All rights reserved. Unauthorized reproduction, distribution, or
                modification of any part of this application is strictly
                prohibited.
              </p>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                C. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                While we use industry-standard AES-256 encryption and
                best-in-class security practices, Safe Storage is not liable for
                data loss resulting from:
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                {[
                  "Forgotten passwords or lost encryption keys.",
                  "Unauthorized access to the user's personal device.",
                  "Force majeure events or acts beyond our reasonable control.",
                  "User error in managing their account or credentials.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                D. Cybercrime Compliance
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Safe Storage strictly prohibits the use of this platform for any
                form of cybercrime, including but not limited to fraud, identity
                theft, hacking, or distribution of malicious content. In
                compliance with India's IT Act (2000) and applicable cyber laws,
                any misuse will be reported to the appropriate authorities.
              </p>
              <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  To report cybercrime or online abuse, visit the Government of
                  India's official portal:{" "}
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
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                E. Acceptance
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By registering for Safe Storage, you confirm that you have read,
                understood, and agree to these Terms of Service and our{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                . You must check the acceptance checkbox during registration to
                use the service.
              </p>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                F. Modifications
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Safe Storage reserves the right to modify these Terms at any
                time. Users will be notified of significant changes via their
                registered email address. Continued use of the service after
                modifications constitutes acceptance of the revised terms.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
