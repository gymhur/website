import Link from 'next/link';
import GymhurLogo from '@/components/ui/GymhurLogo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand border-b border-brand-dark shadow-sm">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Gymhur home">
          <GymhurLogo variant="light" height={28} />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="bg-white hover:bg-surface text-brand text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
