"use client"
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header.jsx';
import { FaHtml5, FaCss3Alt, FaReact, FaJs, FaCloudUploadAlt, FaSearch } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
export default function CustomHeader() {
  return (
    <>
    <Header />
    <main className='px-10 sm:px-20'>
      <h1 className="text-3xl">Shoot ça</h1>
      <div className="grid my-5 md:grid-cols-1 lg:grid-cols-2">
        <Link href="/#projets" className="absolute top-[20%] right-[5%] underline" aria-label="liste des projets">&#8592; Retour</Link>
        <Image 
          alt="game image" 
          src="/images/shoot_ça.jpg" 
          width={599} 
          height={431} 
          className="w-full h-auto md:pr-16" 
          style={{ color: 'transparent' }} 
        />
        <div className='flex flex-col justify-between'>
          <h2 className="pt-3 mb-3 text-2xl font-semibold sm:pt-5">Integration shoot ça</h2>
          <p className="sm:w-4/5">
  Dans "Shoot ça", les plages idylliques sont envahies par une horde de crabes royaux belliqueux ! Incarnez un courageux combattant 
  chargé de défendre les côtes contre cette menace croissante. Armé d'un canon, vous devrez viser et tirer avec précision pour repousser 
  les assauts des crabes, éviter leurs attaques sournoises et protéger les vacanciers en quête de détente.
  Plongez dans l'action palpitante de ce jeu de tir frénétique, où chaque seconde compte dans 
  la bataille pour la survie des plages. Avec des graphismes colorés, une jouabilité immersive et des défis de plus en plus ardus, 
  "Shoot ça" promet une expérience captivante pour les joueurs de tous niveaux. Préparez-vous à affronter une armée de crustacés 
  déterminés et à devenir le héros incontesté des vacances d'été !
          </p>
          <div className="mt-5">
          <h2 className='mb-2'>Technologies :</h2>
<ul className="grid grid-cols-2  w-4/4 justify-between">
  <li className="text-sm md:text-base flex flex-row items-center"><FaHtml5 className="mr-2 text-orange"/>HTML5</li>
  <li className="text-sm md:text-base flex flex-row items-center"><FaCss3Alt className="mr-2 text-blue"/>Design UX UI sous Figma</li>
  <li className="text-sm md:text-base flex flex-row items-center"><FaReact className="mr-2 text-blue"/>React / NextJS (SSR)</li>
  <li className="text-sm md:text-base flex flex-row items-center"><FaJs className="mr-2 text-yellow"/>Typescript</li>
  <li className="text-sm md:text-base flex flex-row items-center"><FaCloudUploadAlt className="mr-2 text-green"/>Déploiement sous Netlify</li>
  <li className="text-sm md:text-base flex flex-row items-center"><FaSearch className="mr-2 text-white"/>Optimisation SEO</li>
</ul>

          </div>




          <div className="flex flex-col sm:flex-row justify-between w-full sm:w-4/5 mt-5">
  <Link href="https://boisterous-narwhal-c559bd.netlify.app/" passHref>
    <button className="bg-purple text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-indigo-600 hover:border-indigo-600 hover:shadow-lg mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto">
      Le Site Web
    </button>
  </Link>
  <Link href="https://github.com/Webstart-Vincent/jeu-mobile-html5-Mohammed-ela" passHref>
    <button className="bg-white text-purple font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-100 hover:border-purple-400 hover:shadow-lg w-full sm:w-auto">
      Le Code source GitHub
    </button>
  </Link>
</div>



          

          </div>
        </div>
      </main>
      <CldImage
  width="300"
  height="300"
  src="sample"
  sizes="100vw"
  alt=""
/>

      </>
  );
}
