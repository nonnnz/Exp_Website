import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="bg-space-bg text-space-cream pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 stars-layer opacity-30" />
        <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] uppercase">About Us</h1>
          <p className="font-mono text-sm md:text-base uppercase text-space-cream/60 max-w-2xl mx-auto mt-4">
            Learn more about who we are and what drives us forward.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-anton text-3xl md:text-4xl uppercase text-accent mb-6">Our Story</h2>
          <p className="font-mono text-sm text-space-cream/70 mb-6 leading-relaxed">
            We are a dedicated team committed to excellence in everything we do. 
            Our journey began with a shared vision to create meaningful impact through 
            collaboration, innovation, and hard work.
          </p>
          <p className="font-mono text-sm text-space-cream/70 mb-12 leading-relaxed">
            Over the years, we have grown both in numbers and in expertise, 
            consistently pushing boundaries and setting new standards in our field.
          </p>

          <h2 className="font-anton text-3xl md:text-4xl uppercase text-accent mb-6">Our Mission</h2>
          <p className="font-mono text-sm text-space-cream/70 mb-12 leading-relaxed">
            To deliver outstanding results through teamwork, creativity, and a 
            relentless pursuit of quality. We believe in empowering each member 
            to reach their full potential.
          </p>

          <h2 className="font-anton text-3xl md:text-4xl uppercase text-accent mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Excellence", desc: "Striving for the highest quality in all our endeavors." },
              { title: "Integrity", desc: "Acting with honesty and transparency in everything we do." },
              { title: "Innovation", desc: "Embracing new ideas and creative solutions." },
              { title: "Collaboration", desc: "Working together to achieve shared goals." },
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
