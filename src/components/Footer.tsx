export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-accent">PORTFOLIO</h3>
            <p className="text-blue-200 text-sm">
              Showcasing our work, achievements, and team excellence.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="/members" className="hover:text-accent transition-colors">Members</a></li>
              <li><a href="/gallery" className="hover:text-accent transition-colors">Gallery</a></li>
              <li><a href="/recognition" className="hover:text-accent transition-colors">Recognition</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-blue-200 text-sm">
              Email: contact@example.com
            </p>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-sm text-blue-200">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
