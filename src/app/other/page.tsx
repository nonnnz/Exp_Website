import Footer from "@/components/Footer";

export default function OtherPage() {
  return (
    <div className="bg-space-bg text-space-cream pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 stars-layer opacity-30" />
        <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] uppercase">Other</h1>
          <p className="font-mono text-sm md:text-base uppercase text-space-cream/60 max-w-2xl mx-auto mt-4">
            Additional information, resources, and updates.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Resources", desc: "Useful documents, templates, and reference materials for our team." },
              { title: "News & Updates", desc: "Stay informed about the latest developments and announcements." },
              { title: "FAQ", desc: "Frequently asked questions and helpful answers." },
              { title: "Contact", desc: "Get in touch with us for inquiries and collaboration opportunities." },
            ].map((item, i) => (
              <div key={i} className="liquid-glass rounded-2xl p-6 hover:bg-white/5 transition-colors">
                <h3 className="font-anton text-xl uppercase mb-3">{item.title}</h3>
                <p className="font-mono text-xs text-space-cream/60 mb-4">{item.desc}</p>
                <span className="font-mono text-xs text-accent">Coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
