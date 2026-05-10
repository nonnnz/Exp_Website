"use client";

import { useEffect, useMemo, useState } from "react";
import { INTEREST_DEFS, type InterestId, type Member } from "./members-data";

type SortOption = "id-asc" | "id-desc" | "name-asc" | "role";

const sortOptions: { id: SortOption; label: string }[] = [
  { id: "id-asc", label: "Member ID ↑" },
  { id: "id-desc", label: "Member ID ↓" },
  { id: "name-asc", label: "Name A-Z" },
  { id: "role", label: "Role" },
];

function getInterestDef(id: InterestId) {
  const normalized = id.trim().toLowerCase();
  return INTEREST_DEFS[normalized] ?? {
    en: id,
    th: id,
    tone: "slate",
    glyph: id.replace(/[^A-Za-z0-9]/g, "").slice(0, 3).toUpperCase() || "AI",
  };
}

function MemberAvatar({ member, size = "large" }: { member: Member; size?: "small" | "large" }) {
  const dimension = size === "small" ? "h-14 w-14" : "h-28 w-28";

  if (member.photoUrl) {
    return (
      <div
        className={`${dimension} rounded-full border border-accent/40 bg-cover bg-center`}
        style={{ backgroundImage: `url(${member.photoUrl})` }}
        role="img"
        aria-label={`${member.name.en} portrait`}
      />
    );
  }

  return (
    <div className={`${dimension} liquid-glass rounded-full border border-white/10 flex items-center justify-center`}>
      <span className="font-anton text-2xl text-accent">{member.initials}</span>
    </div>
  );
}

function InterestBadge({ id }: { id: InterestId }) {
  const interest = getInterestDef(id);

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase text-space-cream/75">
      <span className="text-accent">{interest.glyph}</span>
      {interest.en}
    </span>
  );
}

function MemberCard({ member, onOpen }: { member: Member; onOpen: (member: Member) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(member)}
      className="liquid-glass group rounded-[32px] p-5 text-left transition duration-300 hover:-translate-y-1 hover:bg-white/10"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <MemberAvatar member={member} />
        <span className="font-mono text-xs uppercase text-accent">{member.id}</span>
      </div>

      <p className="mb-1 font-anton text-2xl uppercase leading-none text-space-cream">
        {member.name.en}
      </p>
      <p className="mb-3 font-mono text-xs uppercase text-space-cream/50">
        {member.name.th} / {member.nickname.en}
      </p>
      <p className="mb-5 font-mono text-xs uppercase text-accent">
        {member.role.en}
      </p>

      <div className="mb-5 h-px bg-white/10" />

      <p className="mb-5 min-h-12 font-mono text-xs uppercase leading-relaxed text-space-cream/65">
        “{member.motto.en}”
      </p>

      <div className="flex flex-wrap gap-2">
        {member.interests.slice(0, 3).map((interest) => (
          <InterestBadge key={interest} id={interest} />
        ))}
        {member.interests.length > 3 && (
          <span className="rounded-full border border-accent/30 px-3 py-1 font-mono text-[10px] uppercase text-accent">
            +{member.interests.length - 3}
          </span>
        )}
      </div>
    </button>
  );
}

function MemberModal({ member, onClose }: { member: Member; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#010828]/80 p-4 backdrop-blur-md" onClick={onClose}>
      <article
        className="liquid-glass max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-[32px] p-6 md:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-8 flex items-start justify-between gap-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <MemberAvatar member={member} />
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">{member.id}</p>
              <h2 id="member-title" className="font-anton text-4xl uppercase leading-none text-space-cream md:text-6xl">
                {member.name.en}
              </h2>
              <p className="mt-3 font-mono text-sm uppercase text-space-cream/55">
                {member.name.th} / {member.nickname.th} ({member.nickname.en})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="liquid-glass h-11 w-11 shrink-0 rounded-2xl font-anton text-lg text-space-cream transition hover:bg-white/10"
            aria-label="Close member profile"
          >
            X
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4 font-mono text-xs uppercase text-space-cream/65">
            <div>
              <p className="text-accent">Project ID</p>
              <p>{member.id}</p>
            </div>
            <div>
              <p className="text-accent">Role</p>
              <p>{member.role.en}</p>
              <p className="text-space-cream/35">{member.role.th}</p>
            </div>
            {member.cvUrl && (
              <a
                href={member.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="liquid-glass flex min-h-12 items-center justify-center rounded-2xl px-4 text-center text-space-cream transition hover:bg-white/10 hover:text-accent"
              >
                Open CV
              </a>
            )}
            {member.videoUrl && (
              <a
                href={member.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="liquid-glass flex min-h-12 items-center justify-center rounded-2xl px-4 text-center text-space-cream transition hover:bg-white/10 hover:text-accent"
              >
                Watch Video
              </a>
            )}
          </aside>

          <div className="space-y-8">
            <section>
              <p className="mb-3 font-anton text-2xl uppercase text-space-cream">AI Interests</p>
              <div className="flex flex-wrap gap-2">
                {member.interests.map((interest) => (
                  <InterestBadge key={interest} id={interest} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function MembersClient({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("id-asc");
  const [filters, setFilters] = useState<InterestId[]>([]);
  const [activeMember, setActiveMember] = useState<Member | null>(null);

  const interestIds = useMemo(() => {
    const seen = new Set<string>();
    return members
      .flatMap((member) => member.interests)
      .filter((interest) => {
        const key = interest.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => a.localeCompare(b));
  }, [members]);

  const filteredMembers = useMemo(() => {
    const needle = query.trim().toLowerCase();

    let next = members.filter((member) => {
      const matchesQuery = !needle ||
        member.id.toLowerCase().includes(needle) ||
        member.name.en.toLowerCase().includes(needle) ||
        member.name.th.toLowerCase().includes(needle) ||
        member.nickname.en.toLowerCase().includes(needle) ||
        member.nickname.th.toLowerCase().includes(needle) ||
        member.role.en.toLowerCase().includes(needle) ||
        member.interests.some((interest) => interest.toLowerCase().includes(needle));

      const matchesFilters = filters.every((filter) => member.interests.includes(filter));
      return matchesQuery && matchesFilters;
    });

    next = [...next].sort((a, b) => {
      if (sort === "id-desc") return b.id.localeCompare(a.id);
      if (sort === "name-asc") return a.name.en.localeCompare(b.name.en);
      if (sort === "role") return a.role.en.localeCompare(b.role.en);
      return a.id.localeCompare(b.id);
    });

    return next;
  }, [filters, members, query, sort]);

  return (
    <div className="bg-space-bg text-space-cream pt-20">
      <section className="relative overflow-hidden py-20">
        <div className="stars-layer absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-[1831px] px-4 text-center sm:px-6 lg:px-8">
          <p className="font-cursive text-5xl text-accent md:text-7xl">EXP</p>
          <h1 className="font-anton text-[40px] uppercase leading-none sm:text-[60px] md:text-[75px]">
            Members
          </h1>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1831px] px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass mb-8 rounded-[32px] p-4 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <input
                className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 font-mono text-sm uppercase text-space-cream outline-none placeholder:text-space-cream/35 focus:border-accent/60"
                placeholder="Search by name, ID, nickname, or role"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <select
                className="min-h-12 rounded-2xl border border-white/10 bg-[#010828] px-4 font-mono text-sm uppercase text-space-cream outline-none focus:border-accent/60"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <p className="font-mono text-xs uppercase text-accent">
                {filteredMembers.length.toString().padStart(2, "0")} / {members.length.toString().padStart(2, "0")}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {interestIds.map((interest) => {
                const active = filters.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => setFilters((prev) => active ? prev.filter((item) => item !== interest) : [...prev, interest])}
                    className={`rounded-full border px-3 py-2 font-mono text-[10px] uppercase transition ${
                      active
                        ? "border-accent bg-accent text-[#010828]"
                        : "border-white/10 bg-white/5 text-space-cream/55 hover:text-accent"
                    }`}
                  >
                    {getInterestDef(interest).en}
                  </button>
                );
              })}
              {filters.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFilters([])}
                  className="rounded-full border border-accent/40 px-3 py-2 font-mono text-[10px] uppercase text-accent"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="liquid-glass rounded-[32px] p-10 text-center font-mono text-sm uppercase text-space-cream/55">
              No member profiles match this search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} onOpen={setActiveMember} />
              ))}
            </div>
          )}
        </div>
      </section>

      {activeMember && (
        <MemberModal member={activeMember} onClose={() => setActiveMember(null)} />
      )}
    </div>
  );
}
