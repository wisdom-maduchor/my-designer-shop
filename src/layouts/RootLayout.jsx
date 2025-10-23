import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function RootLayout(){
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--app)] text-[color:var(--foreground)]">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
