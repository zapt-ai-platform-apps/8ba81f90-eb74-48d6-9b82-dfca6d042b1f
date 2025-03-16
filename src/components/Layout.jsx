import React from 'react';
import ZaptBadge from './ZaptBadge';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-4 bg-white border-t">
        <div className="container mx-auto px-4 flex justify-center">
          <ZaptBadge />
        </div>
      </footer>
    </div>
  );
};

export default Layout;