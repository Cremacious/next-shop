export default function Footer() {
  return (
    <footer className="bg-white text-slate-800 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <div className="text-2xl font-bold text-blue-500 mb-2">
            Next Store
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Your one-stop shop for modern products and great deals.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" aria-label="Twitter" className="hover:text-blue-400">
              <svg
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89-.386.104-.793.16-1.213.16-.297 0-.583-.028-.862-.08.584 1.822 2.28 3.148 4.29 3.184A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-400">
              <svg
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-400">
              <svg
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.292 2.393 1.272 3.373.98.98 2.092 1.213 3.373 1.272C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.292 3.373-1.272.98-.98 1.213-2.092 1.272-3.373.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.292-2.393-1.272-3.373-.98-.98-2.092-1.213-3.373-1.272C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>
        {/* Links */}
        <div>
          <div className="font-semibold mb-2">About</div>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/about" className="hover:text-blue-400">
                Our Story
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-blue-400">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Categories</div>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/products?cat=clothing" className="hover:text-blue-400">
                Clothing
              </a>
            </li>
            <li>
              <a
                href="/products?cat=electronics"
                className="hover:text-blue-400"
              >
                Electronics
              </a>
            </li>
            <li>
              <a
                href="/products?cat=accessories"
                className="hover:text-blue-400"
              >
                Accessories
              </a>
            </li>
            <li>
              <a href="/products?cat=footwear" className="hover:text-blue-400">
                Footwear
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/faq" className="hover:text-blue-400">
                FAQ
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-blue-400">
                Returns
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-blue-400">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-400">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Next Store. All rights reserved.
      </div>
    </footer>
  );
}
