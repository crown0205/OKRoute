'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/learning', label: 'Learning' },
  { href: '/okr', label: 'OKR' },
  { href: '/todo', label: 'Todo' },
  { href: '/planner', label: 'Planner' },
  { href: '/reflection', label: 'Reflection' },
];

function Header() {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">OKRoute 📊</h1>
      <div className="flex flex-row gap-2">
        {links.map(link =>
          pathname === link.href ? (
            <span
              key={link.href}
              className={cn(
                'text-sm text-gray-500 transition-colors duration-200 border border-gray-500 rounded-md p-1',
                'bg-gray-100',
              )}
            >
              {link.label}
            </span>
          ) : (
            <Link
              href={link.href}
              key={link.href}
              className="text-sm text-gray-500 hover:text-gray-200 transition-colors duration-200 border border-gray-500 rounded-md p-1"
            >
              {link.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

export default Header;
