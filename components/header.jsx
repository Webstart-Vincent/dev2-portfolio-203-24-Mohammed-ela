'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { toggleTheme } from '@/components/themeToggle.jsx'; 
import { CldImage } from 'next-cloudinary';
import imageData from '@/public/data/images.json';

// image.publicId




export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const logo = imageData.images.find(image => image.name === "logo");
  return (
    <header className="h-full flex md:flex-row justify-between items-center py-5 px-10 gap-2">
      {/* Mon Logo */}
      <div className="flex items-center">
        {/* <Image
          src="/images/IA.png"
          alt="mon-logo"
          width={90}
          height={90}
        /> */}
        <CldImage
            width="90"
            height="90"
            src={logo.publicId}
            sizes="100vw"
            alt="mon-logo"
        />
      </div>
      
      {/* Navigation régulière pour les écrans de taille moyenne et plus grands */}
      <nav className="hidden md:block grid-rows-5">
        <ul className="flex flex-col justify-center items-center md:flex-row md:gap-4 md:items-center md:justify-center md:bg-purple px-4 rounded-full p-2">
          <li className="flex items-center">
            <Link href="#accueil">
              <div>Accueil</div>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#parcours">
              <div>Parcours</div>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#competences">
              <div>Compétences</div>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#projets">
              <div>Projets</div>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#contact">
              <div>Contact</div>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Menu burger */}
      <nav className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col justify-center items-center gap-4 bg-indigo px-4 h-full p-2 rounded">
          <li className="flex items-center">
            <Link href="#accueil">
              <div>Accueil</div>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#portfolio">
              <div>Projets</div>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#">
              <div>Parcours</div>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#competences">
              <div>Compétences</div>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#contact">
              <div>Contact</div>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Bouton pour le menu burger */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          {menuOpen ? (
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

      {/* Bouton de basculement de thème */}
      <button
        id="theme-toggle"
        data-tooltip-target="tooltip-toggle"
        type="button"
        className="text-gray-500 inline-flex items-center justify-center dark:text-gray-400 hover:bg-gray-100 w-10 h-10 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
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
