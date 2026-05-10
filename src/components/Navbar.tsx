"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/members", label: "Members" },
  { href: "/gallery", label: "Gallery" },
  { href: "/recognition", label: "Recognition" },
  { href: "/clip", label: "Clip" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-[1831px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/EXP_LOGO_v4.png" alt="EXP Logo" className="h-14" />
        </Link>

        {/* Desktop Navigation - Liquid Glass */}
        <div className="hidden lg:block">
          <div className="liquid-glass rounded-[28px] px-8 xl:px-[52px] py-5">
            <div className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-anton text-[13px] uppercase tracking-wide text-space-cream hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="liquid-glass rounded-xl p-3 hover:bg-white/10 transition-colors"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden mt-4">
          <div className="liquid-glass rounded-2xl px-6 py-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-anton text-sm uppercase tracking-wide text-space-cream hover:text-accent transition-colors duration-200 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
