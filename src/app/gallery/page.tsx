import Footer from "@/components/Footer";

const galleryItems = [
  { id: 1, title: "Project Alpha", category: "Development" },
  { id: 2, title: "Design Workshop", category: "Event" },
  { id: 3, title: "Team Building", category: "Activity" },
  { id: 4, title: "Conference 2024", category: "Event" },
  { id: 5, title: "Product Launch", category: "Development" },
  { id: 6, title: "Award Ceremony", category: "Recognition" },
  { id: 7, title: "Hackathon", category: "Development" },
  { id: 8, title: "Community Service", category: "Activity" },
  { id: 9, title: "Annual Meeting", category: "Event" },
];

export default function GalleryPage() {
  return (
    <div className="bg-space-bg text-space-cream pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 stars-layer opacity-30" />
        <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] uppercase">Gallery</h1>
          <p className="font-mono text-sm md:text-base uppercase text-space-cream/60 max-w-2xl mx-auto mt-4">
            A visual showcase of our projects, events, and achievements.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div key={item.id} className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-colors duration-300">
                <div className="relative pb-[70%] rounded-[24px] overflow-hidden bg-gradient-to-br from-primary/30 via-space-bg to-[#1a0a3e]/40">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="stars-layer absolute inset-0 opacity-50" />
                    <svg className="w-12 h-12 text-space-cream/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="px-2 pt-4 pb-2">
                  <span className="font-mono text-[11px] text-accent uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-anton text-lg uppercase mt-1">{item.title}</h3>
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
