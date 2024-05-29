'use client'
import React, { useState, useEffect } from "react";
import { CldImage } from 'next-cloudinary';
import imageData from '@/public/data/images.json';

const titles = [
  "Je suis un développeur junior Full Stack",
  "Je suis passionné par le développement Web",
  "Vous retrouverez toutes mes réalisations"
];
const profil = imageData.images.find(image => image.name === "photo_profil");

const About = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex === titles.length - 1 ? 0 : prevIndex + 1));
    }, 3500); // Change le titre toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <section name="accueil" className="h-full pt-12 pb-20 sm:pb-10 sm:px-10">
      <div className="flex flex-col items-center justify-center px-10">
          <h1 className="text-4xl font-bold text-white text-center sm:text-5xl min-h-[60px]">
            {titles[currentTitleIndex]}
          </h1>
          <div className="grid justify-between gap-4 lg:grid-cols-[1fr_300px]">
            <p className='text-gray light:text-black sm:text-justify hidden lg:py-20 lg:leading-relaxed '>
              Découvrez une sélection de mes derniers projets, conçus avec passion et expertise pour des clients variés ou pour des projets personnels. Explorez mon portfolio et plongez dans l'univers de mes créations, où chaque projet raconte une histoire unique et témoigne de mon engagement envers l'excellence et l'innovation dans le domaine du développement web.
            </p>

            <CldImage
              width="300"
              height="300"
              src={profil.publicId}
              sizes="300px"
              className="rounded-full py-10"
              alt="ma_photo_de_profil"
              
            />
          </div>
      </div>
    </section>
  );
};

export default About;
