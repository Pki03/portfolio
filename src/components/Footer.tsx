"use client";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-2">
        <p>
          Designed & built by Prateek Khurmi. All rights reserved.{" "}
          {new Date().getFullYear()}
        </p>
        <p className="font-mono text-xs flex items-center gap-2">
          <span className="text-accent">$</span>
          <span className="text-muted">echo</span>
          <span className="text-green">&ldquo;ship fast, break nothing&rdquo;</span>
        </p>
      </div>
    </footer>
  );
}
