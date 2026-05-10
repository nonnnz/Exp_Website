const members = [
  {
    name: "Member 1",
    role: "Team Leader",
    description: "Leading the team with vision and dedication.",
  },
  {
    name: "Member 2",
    role: "Developer",
    description: "Building innovative solutions with cutting-edge technology.",
  },
  {
    name: "Member 3",
    role: "Designer",
    description: "Creating beautiful and functional designs.",
  },
  {
    name: "Member 4",
    role: "Researcher",
    description: "Driving insights through thorough research and analysis.",
  },
  {
    name: "Member 5",
    role: "Coordinator",
    description: "Ensuring smooth operations and effective communication.",
  },
  {
    name: "Member 6",
    role: "Specialist",
    description: "Providing expert knowledge in specialized areas.",
  },
];

export default function MembersPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Members</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Meet the talented individuals behind our success.
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-blue-100 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-accent text-center font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-center text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
