export default function Footer() {
  return (
    <footer className="bg-space-bg border-t border-white/10 py-8">
      <div className="max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-anton text-sm uppercase text-space-cream/50">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </span>
        <div className="flex gap-6">
          <a href="/about" className="font-anton text-xs uppercase text-space-cream/50 hover:text-accent transition-colors">About</a>
          <a href="/members" className="font-anton text-xs uppercase text-space-cream/50 hover:text-accent transition-colors">Members</a>
          <a href="/gallery" className="font-anton text-xs uppercase text-space-cream/50 hover:text-accent transition-colors">Gallery</a>
          <a href="/recognition" className="font-anton text-xs uppercase text-space-cream/50 hover:text-accent transition-colors">Recognition</a>
        </div>
      </div>
    </footer>
  );
}
