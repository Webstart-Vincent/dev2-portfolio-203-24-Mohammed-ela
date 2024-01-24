import React from 'react';
import Image from 'next/image';
export default function Home() {
  return (
    <>



<header className="h-105 flex flex-col md:flex-row justify-between items-center bg-black border-b border-gray px-40 py-5">
  <div className="flex items-center">
  <Image
  src="/images/my_logo.png"
  alt="mon-logo"
  width={35}
  height={10}
/>
  </div>

  <nav className="nav mt-4 sm:mt-0">
    <ul className="flex flex-col sm:flex-row gap-3">
      <li className='flex items-center'><a href="#accueil" className="">Accueil</a></li>
      {/* <li><a href="#apropos" className="">À propos</a></li> */}
      <li><a className='flex items-center' href="#parcours">Parcours</a></li>
      <li><a href="#competences">Compétences</a></li>
      <li><a href="#projets">Projets</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>


      <div className='bg-indigo-300 flex flex-col px-5 py-20 sm:px-40 sm:flex-row sm:py-15'>
        <div className="flex flex-col gap-10 sm:gap-20">
          <article className='flex flex-col gap-10 w-250'>
            <h1 className='text-xl text-center sm:text-5xl sm:text-left'>Developpeur Web</h1>
                      
            <p className='text-sm md:text-xl'>Bonjour et bienvenue sur mon portfolio en ligne ! Je suis passionné par le développement Web, et ce site est le reflet de mon parcours et de mes réalisations.</p>
            <p className='text-sm md:text-xl'>Merci de votre visite !</p>
          </article>

          <div>
            <button className="bg-pink text-white font-bold py-2 px-4 rounded" onclick="window.open('./assets/CV_Mohammed_cmp.pdf', '_blank')"> Télécharger CV</button>
          </div>
        </div>

        <div className="flex items-center py-5">
        <Image
    src="/images/ma-photo.jpg"
    alt="ma-photo-profil"
    width={300}
    height={300}
    className="max-h-40 max-w-40 sm:h-300 sm:w-300"
  />
        </div>

      </div>



      </>
  );
}
