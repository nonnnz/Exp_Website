export default function HomePage() {
  return (
    <div className="bg-space-bg text-space-cream overflow-hidden">
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-screen flex items-end pb-20 md:pb-32 rounded-b-[32px] overflow-hidden">
        {/* Background - Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/ผมเจนซีขอเฟี้ยวๆ.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-space-bg/40" />
        </div>

        {/* Social Icons - Desktop */}
        <div className="absolute top-28 right-6 lg:right-10 hidden lg:flex flex-col gap-3">
          {["M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
            "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
            "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
          ].map((path, i) => (
            <button key={i} className="liquid-glass w-14 h-14 rounded-[1rem] flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 text-space-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={path} />
              </svg>
            </button>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-[780px] lg:ml-32">
            <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] lg:text-[90px] uppercase leading-[1.05] md:leading-[1]">
              EXP<br />
              Experientia Docet<br />
              Where our crew learns by doing
            </h1>
            {/* Cursive accent */}
            <div className="relative">
              <span className="font-cursive text-accent text-2xl sm:text-3xl md:text-4xl lg:text-5xl absolute -top-16 sm:-top-20 md:-top-24 right-0 lg:right-[-80px] -rotate-1 opacity-90 mix-blend-exclusion">
                EXP forever
              </span>
            </div>
          </div>

          {/* Social Icons - Mobile */}
          <div className="flex lg:hidden gap-3 mt-10 justify-center">
            {["M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
              "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
            ].map((path, i) => (
              <button key={i} className="liquid-glass w-14 h-14 rounded-[1rem] flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-space-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: GAME ===== */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tl from-[#1a0a3e]/50 via-space-bg to-[#0B3D91]/30" />
          <div className="stars-layer absolute inset-0 opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24 text-center">
          <h2 className="font-anton text-[32px] sm:text-[48px] md:text-[60px] uppercase leading-[1.1] mb-6">
            EXP67 <span className="text-accent">Game</span>
          </h2>
          <p className="font-mono text-sm md:text-base uppercase text-space-cream/70 max-w-xl mx-auto mb-10">
            เกมออกกำลังกายด้วย AI — สลับแขนซ้าย-ขวาให้เร็วที่สุด เก็บ EXP อัปขั้นนักพัฒนา AI
          </p>
          <a
            href="/game"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-anton text-lg uppercase rounded-full hover:bg-accent-dark transition-colors shadow-lg shadow-accent/30"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            เล่นเกม
          </a>
        </div>
      </section>

      {/* ===== SECTION 3: COLLECTION GRID ===== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <h2 className="font-anton text-[32px] sm:text-[48px] md:text-[60px] uppercase leading-[1.1]">
              Collection of<br />
              <span className="ml-12 md:ml-24 lg:ml-32">
                <span className="font-cursive text-accent normal-case">Space</span> objects
              </span>
            </h2>
            <div className="flex-shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="font-anton text-[32px] sm:text-[48px] md:text-[60px] uppercase">See</span>
                <div className="flex flex-col leading-tight">
                  <span className="font-anton text-[20px] sm:text-[28px] md:text-[36px] uppercase">All</span>
                  <span className="font-anton text-[20px] sm:text-[28px] md:text-[36px] uppercase">Creators</span>
                </div>
              </div>
              <div className="bg-accent h-[6px] md:h-[10px] w-full rounded-full mt-2" />
            </div>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Nebula Genesis", score: "8.7/10" },
              { title: "Cosmic Drift", score: "9/10" },
              { title: "Dark Matter", score: "8.2/10" },
            ].map((card, i) => (
              <div key={i} className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-colors duration-300">
                {/* Card visual */}
                <div className="relative pb-[100%] rounded-[24px] overflow-hidden bg-gradient-to-br from-primary/40 via-space-bg to-[#1a0a3e]/60">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="stars-layer absolute inset-0 opacity-70" />
                    {/* Planet/Object */}
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full ${
                      i === 0 ? 'bg-gradient-to-br from-accent/60 to-primary' :
                      i === 1 ? 'bg-gradient-to-br from-blue-400/60 to-[#1a0a3e]' :
                      'bg-gradient-to-br from-purple-500/60 to-primary-dark'
                    } shadow-lg glow-pulse`} />
                  </div>
                </div>
                {/* Overlay bar */}
                <div className="liquid-glass rounded-[20px] px-5 py-4 mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-space-cream/70 uppercase tracking-wider">Rarity Score:</p>
                    <p className="text-base font-semibold">{card.score}</p>
                  </div>
                  <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: CTA ===== */}
      <section className="relative py-24 md:py-32">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-space-bg via-primary/20 to-space-bg" />
          <div className="stars-layer absolute inset-0 opacity-40" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:pl-[15%] lg:pr-[20%]">
            {/* Cursive accent */}
            <span className="font-cursive text-accent text-[17px] sm:text-[36px] md:text-[50px] lg:text-[68px] block mb-4 opacity-90 mix-blend-exclusion">
              Go beyond
            </span>

            <h2 className="font-anton text-[16px] sm:text-[32px] md:text-[48px] lg:text-[60px] uppercase leading-[1.15]">
              <span className="block mb-4 md:mb-12">Join us.</span>
              Reveal what&apos;s hidden.<br />
              Define what&apos;s next.<br />
              Follow the signal.
            </h2>
          </div>

          {/* Social Icons - Bottom left */}
          <div className="absolute left-[8%] bottom-[12%] md:bottom-[20%] hidden lg:block">
            <div className="liquid-glass rounded-[1.25rem] overflow-hidden">
              {["M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
              ].map((path, i) => (
                <button key={i} className={`w-16 h-16 flex items-center justify-center hover:bg-white/10 transition-colors ${i < 2 ? 'border-b border-white/10' : ''}`}>
                  <svg className="w-5 h-5 text-space-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-anton text-sm uppercase text-space-cream/50">
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="/about" className="font-anton text-xs uppercase text-space-cream/50 hover:text-accent transition-colors">About</a>
            <a href="/members" className="font-anton text-xs uppercase text-space-cream/50 hover:text-accent transition-colors">Members</a>
            <a href="/gallery" className="font-anton text-xs uppercase text-space-cream/50 hover:text-accent transition-colors">Gallery</a>
            <a href="/recognition" className="font-anton text-xs uppercase text-space-cream/50 hover:text-accent transition-colors">Recognition</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
