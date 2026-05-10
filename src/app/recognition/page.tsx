import Footer from "@/components/Footer";

const awards = [
  { year: "2024", title: "Excellence Award", description: "Recognized for outstanding performance and innovation.", organization: "Industry Association" },
  { year: "2024", title: "Best Team Award", description: "Awarded for exceptional teamwork and collaboration.", organization: "National Committee" },
  { year: "2023", title: "Innovation Prize", description: "Honored for groundbreaking research and development.", organization: "Technology Council" },
  { year: "2023", title: "Community Impact Award", description: "Recognized for positive contributions to the community.", organization: "Local Government" },
  { year: "2022", title: "Rising Star Award", description: "Acknowledged as an emerging leader in the field.", organization: "Professional Society" },
];

export default function RecognitionPage() {
  return (
    <div className="bg-space-bg text-space-cream pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 stars-layer opacity-30" />
        <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] uppercase">Recognition</h1>
          <p className="font-mono text-sm md:text-base uppercase text-space-cream/60 max-w-2xl mx-auto mt-4">
            Awards and achievements that reflect our commitment to excellence.
          </p>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {awards.map((award, index) => (
            <div key={index} className="liquid-glass rounded-2xl p-6 flex gap-6 hover:bg-white/5 transition-colors duration-200">
              <div className="flex-shrink-0 w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center border border-accent/30">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-anton text-lg uppercase">{award.title}</h3>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded font-medium">{award.year}</span>
                </div>
                <p className="font-mono text-sm text-space-cream/60 mb-1">{award.description}</p>
                <p className="font-mono text-xs text-space-cream/40">Awarded by: {award.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
