const awards = [
  {
    year: "2024",
    title: "Excellence Award",
    description: "Recognized for outstanding performance and innovation.",
    organization: "Industry Association",
  },
  {
    year: "2024",
    title: "Best Team Award",
    description: "Awarded for exceptional teamwork and collaboration.",
    organization: "National Committee",
  },
  {
    year: "2023",
    title: "Innovation Prize",
    description: "Honored for groundbreaking research and development.",
    organization: "Technology Council",
  },
  {
    year: "2023",
    title: "Community Impact Award",
    description: "Recognized for positive contributions to the community.",
    organization: "Local Government",
  },
  {
    year: "2022",
    title: "Rising Star Award",
    description: "Acknowledged as an emerging leader in the field.",
    organization: "Professional Society",
  },
];

export default function RecognitionPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Recognition</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Awards and achievements that reflect our commitment to excellence.
          </p>
        </div>
      </section>

      {/* Awards List */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {awards.map((award, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 bg-white border border-blue-100 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-semibold text-primary">{award.title}</h3>
                    <span className="text-sm bg-accent/10 text-accent-dark px-2 py-0.5 rounded font-medium">
                      {award.year}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1">{award.description}</p>
                  <p className="text-sm text-gray-500">Awarded by: {award.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
