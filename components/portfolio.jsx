import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 'shoot-ca',
    href: "https://boisterous-narwhal-c559bd.netlify.app/",
    title: "Shoot ça",
    src: "/images/shoot_ça.jpg",
    alt: "mon-logo"
  },
  {
    id: 'terre',
    href: "https://weather-meteo.netlify.app/",
    title: "Bienvenue sur la terre",
    src: "/images/la_terre.jpg",
    alt: "mon-logo"
  },
  {
    id: 'monnaie',
    href: "https://dazzling-alpaca-83a22f.netlify.app/",
    title: "Convertisseur Monnaie",
    src: "/images/shoot_ça.jpg", // Remplacer par l'image appropriée
    alt: "mon-logo"
  },
  {
    id: 'todolist',
    href: "https://todolist-mohammed.netlify.app/",
    title: "ToDoList",
    src: "/images/shoot_ça.jpg", // Remplacer par l'image appropriée
    alt: "mon-logo"
  }
];

export default function Portfolio() {
  return (
    <>
      <section id='projets' name='portfolio' className='h-full grid gap-14 px-10 sm:mb-15 sm:px-10'>
        <div className='header grid gap-4'>
          <h3 className='text-3xl font-bold text-center sm:text-left '>Mes derniers projets</h3>
          <p className='text-gray sm:text-center'>
            Découvrez une sélection de mes derniers projets, conçus avec passion et expertise pour des clients variés ou pour des projets personnels. Explorez mon portfolio et plongez dans l'univers de mes créations, où chaque projet raconte une histoire unique et témoigne de mon engagement envers l'excellence et l'innovation dans le domaine du développement web.
          </p>
        </div>
        <div name='gallery' className='sm:pb-8'>
          <ul className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            {projects.map((project, index) => (
              <Link key={project.id} href={`/works/${project.id}`} className='relative border border-white shadow-lg rounded-lg'>
                <span name='title-projet' className="absolute top-5 left-5 bg-blackbg p-2 rounded text-gray font-bold">{project.title}</span>
                <Image
                  src={project.src}
                  alt={project.alt}
                  width={500} 
                  height={500} 
                  className="rounded-lg border-double hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </Link>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
