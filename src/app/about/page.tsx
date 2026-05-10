export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Learn more about who we are and what drives us forward.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We are a dedicated team committed to excellence in everything we do. 
              Our journey began with a shared vision to create meaningful impact through 
              collaboration, innovation, and hard work.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Over the years, we have grown both in numbers and in expertise, 
              consistently pushing boundaries and setting new standards in our field.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Our Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              To deliver outstanding results through teamwork, creativity, and a 
              relentless pursuit of quality. We believe in empowering each member 
              to reach their full potential.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-white rounded-lg border border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-primary mb-2">Excellence</h3>
                <p className="text-gray-600">Striving for the highest quality in all our endeavors.</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-primary mb-2">Integrity</h3>
                <p className="text-gray-600">Acting with honesty and transparency in everything we do.</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-primary mb-2">Innovation</h3>
                <p className="text-gray-600">Embracing new ideas and creative solutions.</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-primary mb-2">Collaboration</h3>
                <p className="text-gray-600">Working together to achieve shared goals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
