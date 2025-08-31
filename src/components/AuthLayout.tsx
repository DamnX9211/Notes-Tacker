import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NQ</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Blue wave image */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
          <div className="w-full h-full bg-gradient-to-r from-blue-400/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Welcome to NotesApp</h3>
              <p className="text-blue-100">Your personal note-taking companion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}