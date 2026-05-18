"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const Planet = dynamic(() => import("@/components/Planet"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-mono text-xs text-space-cream/50">Loading Planet...</p>
      </div>
    </div>
  ),
});

interface Comment {
  id: number;
  text: string;
  author: string;
  lat: number;
  lng: number;
}

const SHEET_API_URL = "/api/sheets/about-comments";

function parseCsvRow(row: string): string[] {
  const cells: string[] = [];
  let value = "";
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const c = row[i];
    const n = row[i + 1];
    if (c === '"' && inQuotes && n === '"') { value += '"'; i++; continue; }
    if (c === '"') { inQuotes = !inQuotes; continue; }
    if (c === ',' && !inQuotes) { cells.push(value); value = ''; continue; }
    value += c;
  }
  cells.push(value);
  return cells;
}

async function fetchSheetComments(): Promise<Comment[]> {
  const res = await fetch(SHEET_API_URL);
  if (!res.ok) return [];
  const csv = await res.text();
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCsvRow(lines[0]);
  const nameIdx = headers.findIndex((h) => h.includes("Name"));
  const feelingIdx = headers.findIndex((h) => h.includes("feeling"));

  if (nameIdx === -1 || feelingIdx === -1) return [];

  return lines.slice(1).map((line, i) => {
    const cells = parseCsvRow(line);
    return {
      id: i + 1,
      text: (cells[feelingIdx] || "").trim().slice(0, 60),
      author: (cells[nameIdx] || "Anonymous").trim(),
      lat: Math.random() * 140 - 70,
      lng: Math.random() * 360 - 180,
    };
  }).filter((c) => c.text.length > 0);
}

export default function AboutPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  // Load comments from Google Sheet
  useEffect(() => {
    fetchSheetComments().then((sheetComments) => {
      if (sheetComments.length > 0) {
        setComments(sheetComments);
      }
      // Also merge any local comments from localStorage
      const saved = localStorage.getItem("planet-comments");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setComments((prev) => [...prev, ...parsed]);
        } catch {
          // ignore parse errors
        }
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      text: newText.trim().slice(0, 50),
      author: newAuthor.trim() || "Anonymous",
      lat: Math.random() * 140 - 70,
      lng: Math.random() * 360 - 180,
    };

    const userComments = JSON.parse(localStorage.getItem("planet-comments") || "[]");
    const updated = [...userComments, comment];
    localStorage.setItem("planet-comments", JSON.stringify(updated));
    setComments((prev) => [...prev, comment]);
    setNewText("");
    setNewAuthor("");
  };

  return (
    <div className="bg-space-bg text-space-cream pt-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 stars-layer opacity-30" />
        <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] uppercase">
            About Us
          </h1>
          <p className="font-mono text-sm md:text-base uppercase text-space-cream/60 max-w-2xl mx-auto mt-4">
            Explore our planet — leave your mark in the universe.
          </p>
        </div>
      </section>

      {/* Planet Section */}
      <section className="relative py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="font-mono text-xs text-space-cream/50 uppercase tracking-wider">
              Drag to rotate • Scroll to zoom • Comments appear on the planet
            </p>
          </div>
          <Planet comments={comments} />
        </div>
      </section>

      {/* Comment Form */}
      <section className="py-12">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass rounded-2xl p-6">
            <h3 className="font-anton text-xl uppercase mb-4 text-center">
              Leave Your Mark
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="author" className="font-mono text-xs text-space-cream/60 uppercase block mb-1">
                  Name
                </label>
                <input
                  id="author"
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Anonymous"
                  maxLength={20}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-space-cream placeholder-space-cream/30 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="comment" className="font-mono text-xs text-space-cream/60 uppercase block mb-1">
                  Message (max 50 chars)
                </label>
                <input
                  id="comment"
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Write something..."
                  maxLength={50}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-space-cream placeholder-space-cream/30 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-white font-anton uppercase text-sm py-3 rounded-lg hover:bg-accent-dark transition-colors"
              >
                Send to Planet
              </button>
            </form>
            <p className="font-mono text-[10px] text-space-cream/40 text-center mt-3">
              {comments.length} messages orbiting the planet
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-anton text-3xl md:text-4xl uppercase text-accent mb-6">
            Our Story
          </h2>
          <p className="font-mono text-sm text-space-cream/70 mb-6 leading-relaxed">
            EXP began with one shared belief: <span className="text-space-cream font-semibold">experience teaches</span> — <em>Experientia Docet</em>.
          </p>
          <p className="font-mono text-sm text-space-cream/70 mb-6 leading-relaxed">
            We are a team of explorers, creators, and problem-solvers who learn by doing, grow through every mission, and turn every challenge into a new discovery.
          </p>
          <p className="font-mono text-sm text-space-cream/70 mb-6 leading-relaxed">
            Like stars in the same galaxy, each member brings different skills, ideas, and energy. Together, we travel beyond familiar boundaries, support one another through every orbit, and create work that reflects our teamwork, creativity, and dedication.
          </p>
          <p className="font-mono text-sm text-space-cream/70 mb-12 leading-relaxed">
            Our journey is not only about reaching the destination. It is about the experience we collect along the way.
          </p>

          <h2 className="font-anton text-3xl md:text-4xl uppercase text-accent mb-6">
            Our Mission
          </h2>
          <p className="font-mono text-sm text-space-cream/70 mb-6 leading-relaxed">
            To explore new ideas, create meaningful work, and grow through real experience.
          </p>
          <p className="font-mono text-sm text-space-cream/70 mb-12 leading-relaxed">
            We aim to use teamwork, creativity, and curiosity to complete every mission with purpose, quality, and pride.
          </p>

          <h2 className="font-anton text-3xl md:text-4xl uppercase text-accent mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Experience",
                desc: "We believe every mission teaches us something valuable. Each challenge helps us become better, stronger, and more prepared for the next journey.",
              },
              {
                title: "Exploration",
                desc: "We are not afraid to go beyond the usual path. We welcome new ideas, new perspectives, and new ways to solve problems.",
              },
              {
                title: "Collaboration",
                desc: "Every crew member matters. We work together, support each other, and combine our strengths to move the whole team forward.",
              },
              {
                title: "Creativity",
                desc: "We turn imagination into action. From small ideas to big missions, we use creativity to make our universe more exciting.",
              },
            ].map((v, i) => (
              <div key={i} className="liquid-glass rounded-2xl p-6">
                <h3 className="font-anton text-xl uppercase mb-2">{v.title}</h3>
                <p className="font-mono text-sm text-space-cream/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
