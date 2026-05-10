const clips = [
  {
    id: 1,
    title: "Project Presentation",
    description: "Our team presenting the final project to stakeholders.",
    duration: "5:30",
  },
  {
    id: 2,
    title: "Behind the Scenes",
    description: "A look at our daily workflow and creative process.",
    duration: "3:45",
  },
  {
    id: 3,
    title: "Award Acceptance Speech",
    description: "Receiving the Excellence Award at the annual ceremony.",
    duration: "2:15",
  },
  {
    id: 4,
    title: "Team Interview",
    description: "Members sharing their experiences and insights.",
    duration: "8:20",
  },
  {
    id: 5,
    title: "Event Highlights",
    description: "Best moments from our recent events and activities.",
    duration: "4:10",
  },
  {
    id: 6,
    title: "Tutorial: Our Process",
    description: "A walkthrough of our methodology and approach.",
    duration: "12:00",
  },
];

export default function ClipPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Clip</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Video clips showcasing our work, events, and team activities.
          </p>
        </div>
      </section>

      {/* Clips Grid */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clips.map((clip) => (
              <div
                key={clip.id}
                className="bg-white border border-blue-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="aspect-video bg-primary flex items-center justify-center relative">
                  <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {clip.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary mb-1">
                    {clip.title}
                  </h3>
                  <p className="text-sm text-gray-600">{clip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
