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
          <a href="https://www.instagram.com/exp.ectonum?igsh=cXQ3aHZoaWY0Y3Jv" target="_blank" rel="noopener noreferrer" className="liquid-glass w-14 h-14 rounded-[1rem] flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5 text-space-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-[780px] lg:ml-32">
            <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] lg:text-[90px] uppercase leading-[1.05] md:leading-[1]">
              EXP<br />
              EXPERIENTIA DOCET
              WHERE OUR CREW LEARNS BY DOING
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
            <a href="https://www.instagram.com/exp.ectonum?igsh=cXQ3aHZoaWY0Y3Jv" target="_blank" rel="noopener noreferrer" className="liquid-glass w-14 h-14 rounded-[1rem] flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 text-space-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: INTRO ===== */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tl from-[#1a0a3e]/50 via-space-bg to-[#0B3D91]/30" />
          <div className="stars-layer absolute inset-0 opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
            <div className="relative">
              <h2 className="font-anton text-[32px] sm:text-[48px] md:text-[60px] uppercase leading-[1.1]">
                Gain EXP<br />
                SIX <span className="text-accent">SEVEN</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: CTA ===== */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-space-bg via-primary/20 to-space-bg" />
          <div className="stars-layer absolute inset-0 opacity-40" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:pl-[15%] lg:pr-[20%]">
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
              <a href="https://www.instagram.com/exp.ectonum?igsh=cXQ3aHZoaWY0Y3Jv" target="_blank" rel="noopener noreferrer" className="w-16 h-16 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-space-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
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
