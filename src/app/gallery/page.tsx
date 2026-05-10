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
    <div>
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            A visual showcase of our projects, events, and achievements.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg border border-blue-100 bg-white hover:shadow-lg transition-all duration-200"
              >
                <div className="aspect-video bg-primary/5 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-accent uppercase tracking-wide">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-primary mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
