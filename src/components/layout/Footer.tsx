import Link from 'next/link';
import GymhurLogo from '@/components/ui/GymhurLogo';

export default function Footer() {
  return (
    <footer className="bg-brand text-white mt-24">
      <div className="max-w-content mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="mb-4">
            <GymhurLogo variant="light" height={24} />
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Premier custom sportswear and activewear manufacturer. Low MOQs. OEM/ODM solutions.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm text-white/60">
            {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About'], ['/contact', 'Get a Quote']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-white/60">
            <li>137-C Small Industrial Estate</li>
            <li>Shahabpura, Sialkot, Pakistan</li>
            <li>
              <a href="tel:+923001496487" className="hover:text-white transition-colors">
                +92-300-1496487
              </a>
            </li>
            <li>
              <a href="mailto:info@gymhur.com" className="hover:text-white transition-colors">
                info@gymhur.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-6 text-sm text-white/40">
        © {new Date().getFullYear()} Gymhur. All rights reserved.
      </div>
    </footer>
  );
}
