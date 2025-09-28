'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {
  const isLoggedIn = true;
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex flex-row justify-between items-center relative">
        <Link href={'/'}>
          <h1 className="text-2xl font-bold">OKRoute 📊</h1>
        </Link>
        <div className="flex flex-row gap-2">
          {/* {mainLinks.map(link =>
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
          )} */}
          <div className="flex justify-end">
            {isLoggedIn ? (
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 px-3 py-1 rounded-md border border-gray-300">
                로그아웃
              </button>
            ) : (
              <Link
                href="/login"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 px-3 py-1 rounded-md border border-gray-300"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
