import Footer from "@/components/Footer";

const members = [
  { name: "Member 1", role: "Team Leader", description: "Leading the team with vision and dedication." },
  { name: "Member 2", role: "Developer", description: "Building innovative solutions with cutting-edge technology." },
  { name: "Member 3", role: "Designer", description: "Creating beautiful and functional designs." },
  { name: "Member 4", role: "Researcher", description: "Driving insights through thorough research and analysis." },
  { name: "Member 5", role: "Coordinator", description: "Ensuring smooth operations and effective communication." },
  { name: "Member 6", role: "Specialist", description: "Providing expert knowledge in specialized areas." },
];

export default function MembersPage() {
  return (
    <div className="bg-space-bg text-space-cream pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 stars-layer opacity-30" />
        <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] uppercase">Members</h1>
          <p className="font-mono text-sm md:text-base uppercase text-space-cream/60 max-w-2xl mx-auto mt-4">
            Meet the talented crew behind our success.
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16">
        <div className="max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div key={index} className="liquid-glass rounded-[32px] p-6 hover:bg-white/5 transition-colors duration-300">
                <div className="w-20 h-20 bg-primary/30 rounded-full mx-auto mb-4 flex items-center justify-center border border-accent/30">
                  <svg className="w-10 h-10 text-accent/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-anton text-xl uppercase text-center mb-1">{member.name}</h3>
                <p className="text-sm text-accent text-center font-medium mb-3">{member.role}</p>
                <p className="font-mono text-xs text-space-cream/60 text-center">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
