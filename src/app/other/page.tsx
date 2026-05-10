export default function OtherPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Other</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Additional information, resources, and updates.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white border border-blue-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-3">Resources</h3>
              <p className="text-gray-600 mb-4">
                Useful documents, templates, and reference materials for our team.
              </p>
              <span className="text-sm text-accent font-medium">Coming soon</span>
            </div>
            <div className="p-6 bg-white border border-blue-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-3">News & Updates</h3>
              <p className="text-gray-600 mb-4">
                Stay informed about the latest developments and announcements.
              </p>
              <span className="text-sm text-accent font-medium">Coming soon</span>
            </div>
            <div className="p-6 bg-white border border-blue-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-3">FAQ</h3>
              <p className="text-gray-600 mb-4">
                Frequently asked questions and helpful answers.
              </p>
              <span className="text-sm text-accent font-medium">Coming soon</span>
            </div>
            <div className="p-6 bg-white border border-blue-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-3">Contact</h3>
              <p className="text-gray-600 mb-4">
                Get in touch with us for inquiries and collaboration opportunities.
              </p>
              <span className="text-sm text-accent font-medium">Coming soon</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
