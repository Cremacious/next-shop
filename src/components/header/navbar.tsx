import Link from 'next/link';
import CartIcon from './cart-icon';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          {/* You can replace this with an actual logo image if desired */}
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#2563EB" />
            <text
              x="16"
              y="22"
              textAnchor="middle"
              fontSize="16"
              fill="#fff"
              fontFamily="Arial"
            >
              N
            </text>
          </svg>
          Next Store
        </Link>
        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <CartIcon />
          </Link>
          {/* User Icon */}
          <Link href="/account">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="text-gray-700 hover:text-blue-600"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
            </svg>
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          {/* You can implement a mobile menu here if needed */}
          <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
