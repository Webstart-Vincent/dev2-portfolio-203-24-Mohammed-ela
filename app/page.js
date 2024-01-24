import React from 'react';

export default function Home() {
  return (
    <>



<header className="h-105 flex flex-col md:flex-row justify-between items-center bg-black border-b border-gray px-20 py-5">
  <div className="flex items-center">
    <img src="images/my_logo.png" alt="mon-logo" className='w-35 h-10'/>
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


      <body className=''>
        <div className="px-20 pt-20 flex flex-col gap-20">
          <article className='flex flex-col gap-10'>
            <p className='text-base'>Bonjour à tous ! Je suis</p>
            <h1 className='text-5xl'>Developpeur Web</h1>
                      
            <p className='text-xl text-gray md:text-lg'>Bonjour et bienvenue sur mon portfolio en ligne ! Je suis passionné par le développement Web, et ce site est le reflet de mon parcours et de mes réalisations.</p>
            <p className='text-xl text-gray md:text-lg'>Merci de votre visite !</p>
          </article>

          <div>
            <button className="bg-gray hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="window.open('./assets/CV_Mohammed_cmp.pdf', '_blank')"> Télécharger CV</button>
          </div>
        </div>
      </body>



      </>
  );
}
