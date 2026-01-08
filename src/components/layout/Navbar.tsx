'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; image?: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check NextAuth session first, then custom JWT
  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name || 'User',
        email: session.user.email || '',
        image: session.user.image || undefined,
      });
    } else {
      // Fallback to custom JWT auth
      const checkAuth = async () => {
        try {
          const res = await fetch('/api/auth/me');
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          }
        } catch (error) {
          // Not logged in
        }
      };
      checkAuth();
    }
  }, [session]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showDropdown && !(e.target as Element).closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  const handleLogout = async () => {
    try {
      // Logout from both NextAuth and custom JWT
      if (session) {
        await signOut({ redirect: false });
      }
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3'
          : 'py-5'
      }`}
    >
      {/* Glassmorphism container */}
      <div className={`mx-auto max-w-[1200px] px-4 transition-all duration-500 ${
        scrolled ? 'px-4' : 'px-6'
      }`}>
        <div className={`relative flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? 'h-14 px-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-200/50' 
            : 'h-14 px-2'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-poppins text-[15px] font-semibold text-gray-900 tracking-[-0.01em]">RetailSync AI</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-1">
            {/* Editor Link */}
            <Link
              href="/editor"
              className="px-4 py-2 font-poppins text-[13px] font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100/80 transition-all duration-200"
            >
              Ad Creator
            </Link>

            {/* Login/Register or Profile */}
            {user ? (
              <div className="relative profile-dropdown ml-2">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100/80 transition-all duration-200"
                >
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full ring-2 ring-gray-100" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-3 w-52 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-200/60 py-1.5 z-50">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="font-poppins text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="font-poppins text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2.5 mx-1.5 my-1 px-3 py-2 rounded-lg font-poppins text-[13px] text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-[calc(100%-12px)] mx-1.5 mb-1 flex items-center gap-2.5 px-3 py-2 rounded-lg font-poppins text-[13px] text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="ml-2 px-4 py-2 bg-gray-900 text-white font-poppins text-[13px] font-medium rounded-full hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
