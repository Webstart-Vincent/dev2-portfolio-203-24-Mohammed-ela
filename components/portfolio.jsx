import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function Portfolio() {

  return (
    <>
    <section name='portfolio' className='h-full grid gap-14 px-10 sm:mb-15 sm:px-10'>
    <div className='header grid gap-4'>
        <h3 className='text-3xl font-bold text-center sm:text-left '>Mes derniers projets</h3>
        <p className='text-gray sm:text-center'>
  Découvrez une sélection de mes derniers projets, conçus avec passion et expertise pour des clients variés ou pour des projets personnels. Explorez mon portfolio et plongez dans l'univers de mes créations, où chaque projet raconte une histoire unique et témoigne de mon engagement envers l'excellence et l'innovation dans le domaine du développement web.
</p>

    </div>
    {/* <Link href="#accueil">
          <div>Accueil</div>
        </Link> */}
    <div name='gallery' className='sm:pb-8'>
        <ul className='flex flex-col items-center justify-center gap-4 sm:flex-row'>

            <Link href="https://boisterous-narwhal-c559bd.netlify.app/" className='relative border border-white shadow-lg rounded-lg'>
            <span name='title-projet' className="absolute top-5 left-5 bg-blackbg p-2 rounded text-gray font-bold">Shoot ça</span>
            <Image
              src="/images/shoot_ça.jpg"
              alt="mon-logo"
              width={500} 
              height={500} 
              className="rounded-lg border-double hover:scale-105 transition-transform duration-500 ease-in-out"
            />



            </Link>
            <Link href="https://weather-meteo.netlify.app/" className='relative border border-white shadow-lg rounded-lg'>
            <span name='title-projet' className="absolute top-5 left-5 bg-blackbg p-2 rounded text-gray font-bold">Bienvenue sur la terre</span>
            <Image
              src="/images/la_terre.jpg"
              alt="mon-logo"
              width={500} 
              height={500} 
              className="rounded-lg border-double hover:scale-105 transition-transform duration-500 ease-in-out"
            />

            </Link>
            <Link href="https://dazzling-alpaca-83a22f.netlify.app/" className='relative border border-white shadow-lg rounded-lg'>
            <span name='title-projet' className="absolute top-5 left-5 bg-blackbg p-2 rounded text-gray font-bold">Convertisseur Monnaie</span>
            <Image
              src="/images/shoot_ça.jpg"
              // src="/images/convert.png"
              alt="mon-logo"
              width={500} 
              height={500} 
              className="rounded-lg border-double hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            </Link>

            <Link href="https://todolist-mohammed.netlify.app/" className='relative border border-white shadow-lg rounded-lg'>
            <span name='title-projet' className="absolute top-5 left-5 bg-blackbg p-2 rounded text-gray font-bold">ToDoList</span>
            <Image
              src="/images/shoot_ça.jpg"
              // src="/images/todolist.png"
              alt="mon-logo"
              width={500} 
              height={500} 
              className="rounded-lg border-double hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            </Link>

        </ul>
    </div>
   

    </section>

    </>

  );
}
