'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { toggleTheme } from '@/components/themeToggle.jsx'; 
import { CldImage } from 'next-cloudinary';
import imageData from '@/public/data/images.json';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const logo = imageData.images.find(image => image.name === "logo");

  return (
    <header className="flex flex-wrap justify-between items-center py-5 px-10 animate-fadeIn">
      {/* Mon Logo */}
      <div className="flex items-center">
        <CldImage
          width="90"
          height="90"
          src={logo.publicId}
          sizes="100vw"
          alt="mon-logo"
          className="transition-transform transform hover:scale-110 duration-300"
        />
      </div>

      {/* Navigation régulière pour les écrans de taille moyenne et plus grands */}
      <nav className="hidden md:block">
        <ul className="flex flex-col md:flex-row md:gap-4 md:items-center bg-purple px-4 rounded-full p-2">
          {['#accueil', '#parcours', '#competences', '#projets', '#contact'].map((href, index) => (
            <li key={index} className="flex items-center transition-transform transform hover:scale-110 duration-300">
              <Link href={href}>
                <div>{href.replace('#', '').charAt(0).toUpperCase() + href.slice(2)}</div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menu burger pour les petits écrans */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none transition-transform transform hover:scale-110 duration-300"
        >
          {menuOpen ? (
            <svg
            
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>menu burger</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Menu burger */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-indigo animate-slideIn">
          <ul className="flex flex-col items-center gap-4 p-4">
            {['#accueil', '#portfolio', '#parcours', '#competences', '#contact'].map((href, index) => (
              <li key={index} className="transition-transform transform hover:scale-110 duration-300">
                <Link href={href}>
                  <div>{href.replace('#', '').charAt(0).toUpperCase() + href.slice(2)}</div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Bouton de basculement de thème */}
      <button
        id="theme-toggle"
        data-tooltip-target="tooltip-toggle"
        type="button"
        className="text-gray-500 inline-flex items-center justify-center dark:text-gray-400 hover:bg-gray-100 w-10 h-10 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 transition-transform transform hover:scale-110 duration-300"
        onClick={toggleTheme} 
      >
        <svg
          id="theme-toggle-dark-icon"
          className="w-4 h-4 hidden"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
        </svg>
        <svg
          id="theme-toggle-light-icon"
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
        </svg>
        <span className="sr-only">Toggle dark mode</span>
      </button>
    </header>
  );
}
