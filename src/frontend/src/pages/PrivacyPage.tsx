import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Shield } from "lucide-react";
import { motion } from "motion/react";

export default function PrivacyPage() {
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
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Privacy Policy
            </h1>
            <p className="mt-2 text-muted-foreground">
              Last Updated: March 29, 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-foreground">
            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Safe Storage is founded by Mr. Adhikari Chandra Kiran
                (Co-Founder & Lead Visionary) and Mr. Adhikari Poorna Sai
                Srinivas (Co-Founder & Technical Partner). We are committed to
                protecting your privacy and ensuring the security of your
                personal data. This Privacy Policy explains how we collect, use,
                and safeguard your information in compliance with GDPR
                principles and India's IT Act.
              </p>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                A. Data Collection & Usage
              </h2>
              <p className="mb-3 text-muted-foreground leading-relaxed">
                We prioritize your privacy. The app collects the following
                information:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <strong className="text-foreground">
                      Account Information:
                    </strong>{" "}
                    Email addresses (including those of founders Mr. Adhikari
                    Chandra Kiran and Mr. Adhikari Poorna Sai Srinivas) are used
                    for authentication and communication purposes.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <strong className="text-foreground">Encrypted Data:</strong>{" "}
                    Files uploaded to Safe Storage are encrypted using AES-256
                    client-side encryption. The app administrators cannot view
                    the contents of your files. Only you hold the decryption
                    key.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <strong className="text-foreground">File Metadata:</strong>{" "}
                    We store file names, sizes, and upload timestamps to provide
                    file management functionality.
                  </div>
                </li>
              </ul>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                B. Data Security
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <strong className="text-foreground">
                      Zero-Knowledge Architecture:
                    </strong>{" "}
                    We do not store your master password or encryption keys on
                    our servers. All encryption and decryption occurs
                    exclusively on your device.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <strong className="text-foreground">
                      AES-256 Encryption:
                    </strong>{" "}
                    All files are encrypted with AES-256-GCM before upload. Data
                    in transit is protected by TLS/SSL protocols.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <strong className="text-foreground">Secure Storage:</strong>{" "}
                    All data is hosted on secure cloud servers (Internet
                    Computer blockchain) with 24/7 monitoring.
                  </div>
                </li>
              </ul>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                C. Third-Party Sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Safe Storage does not sell or rent user data to third parties.
                Your data is only accessed if required by applicable law
                (including India's IT Act and GDPR) or strictly necessary to
                maintain the core functionality of the service. We will always
                notify you of any legally required disclosure to the extent
                permitted by law.
              </p>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                D. Your Rights
              </h2>
              <p className="mb-3 text-muted-foreground leading-relaxed">
                Under GDPR and applicable data protection laws, you have the
                right to:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                {[
                  "Access your personal data",
                  "Correct inaccurate data",
                  "Request deletion of your data",
                  "Object to or restrict processing",
                  "Data portability",
                ].map((right) => (
                  <li key={right} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {right}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                E. Cybercrime Reporting
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Safe Storage is dedicated to protecting users from cyber threats
                and online fraud. In accordance with India's IT Act and our
                commitment to a safe digital environment, we strongly encourage
                users to report any cybercrime, online fraud, data theft, or
                digital harassment to the Government of India's official portal:
              </p>
              <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3">
                <p className="text-sm font-medium text-foreground">
                  National Cyber Crime Reporting Portal
                </p>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline font-semibold"
                >
                  https://cybercrime.gov.in
                </a>
                <p className="mt-2 text-xs text-muted-foreground">
                  Operated by the Ministry of Home Affairs, Government of India.
                </p>
              </div>
            </section>

            <section className="rounded-xl border border-border/50 bg-card/40 p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                Contact
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy-related inquiries, please contact the Safe Storage
                founders:
              </p>
              <ul className="mt-3 space-y-1 text-muted-foreground">
                <li>
                  <strong className="text-foreground">
                    Mr. Adhikari Chandra Kiran
                  </strong>{" "}
                  — Co-Founder & Lead Visionary
                </li>
                <li>
                  <strong className="text-foreground">
                    Mr. Adhikari Poorna Sai Srinivas
                  </strong>{" "}
                  — Co-Founder & Technical Partner
                </li>
              </ul>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
