import Footer from "@/components/Footer";

const clips = [
  { id: 1, title: "Project Presentation", description: "Our team presenting the final project to stakeholders.", duration: "5:30" },
  { id: 2, title: "Behind the Scenes", description: "A look at our daily workflow and creative process.", duration: "3:45" },
  { id: 3, title: "Award Acceptance Speech", description: "Receiving the Excellence Award at the annual ceremony.", duration: "2:15" },
  { id: 4, title: "Team Interview", description: "Members sharing their experiences and insights.", duration: "8:20" },
  { id: 5, title: "Event Highlights", description: "Best moments from our recent events and activities.", duration: "4:10" },
  { id: 6, title: "Tutorial: Our Process", description: "A walkthrough of our methodology and approach.", duration: "12:00" },
];

export default function ClipPage() {
  return (
    <div className="bg-space-bg text-space-cream pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 stars-layer opacity-30" />
        <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] uppercase">Clip</h1>
          <p className="font-mono text-sm md:text-base uppercase text-space-cream/60 max-w-2xl mx-auto mt-4">
            Video clips showcasing our work, events, and team activities.
          </p>
        </div>
      </section>

      {/* Clips Grid */}
      <section className="py-16">
        <div className="max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clips.map((clip) => (
              <div key={clip.id} className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-colors duration-300">
                <div className="relative pb-[56%] rounded-[24px] overflow-hidden bg-gradient-to-br from-primary/50 via-space-bg to-[#1a0a3e]/60">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center hover:bg-accent/30 transition-colors">
                      <svg className="w-6 h-6 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-space-cream text-xs px-2 py-1 rounded font-mono">
                    {clip.duration}
                  </span>
                </div>
                <div className="px-2 pt-4 pb-2">
                  <h3 className="font-anton text-lg uppercase mb-1">{clip.title}</h3>
                  <p className="font-mono text-xs text-space-cream/60">{clip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
