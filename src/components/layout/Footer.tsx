import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white mt-24">
      <div className="max-w-content mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="text-xl font-bold mb-3">GYMHUR</div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premier custom sportswear and activewear manufacturer. Low MOQs. OEM/ODM solutions.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm text-gray-400">
            {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About'], ['/contact', 'Get a Quote']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-gray-400">
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
      <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Gymhur. All rights reserved.
      </div>
    </footer>
  );
}
