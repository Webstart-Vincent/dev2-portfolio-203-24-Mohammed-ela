'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from 'next/image';
const titles = [
  "Je suis un développeur junior Full Stack",
  "Je suis passionné par le développement Web",
  "Vous retrouverez toute mes réalisations"
];

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

          <h1 className="text-4xl font-bold text-white text-center sm:text-5xl">
            <AnimatePresence>
              <motion.span
                key={titles[currentTitleIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TypeAnimation
                  sequence={[titles[currentTitleIndex]]}
                  wrapper="span"
                  speed={50}
                  style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
                />
              </motion.span>
            </AnimatePresence>
          </h1>
          <div className="flex justify-between gap-4">
                      <p className='text-gray sm:text-justify sm:hidden lg:block hidden lg:py-20 lg:leading-relaxed lg:flex lg:flex-col lg:justify-center'>
              Découvrez une sélection de mes derniers projets, conçus avec passion et expertise pour des clients variés ou pour des projets personnels. Explorez mon portfolio et plongez dans l'univers de mes créations, où chaque projet raconte une histoire unique et témoigne de mon engagement envers l'excellence et l'innovation dans le domaine du développement web.
              Découvrez une sélection de mes derniers projets, conçus avec passion et expertise pour des clients variés ou pour des projets personnels. Explorez mon portfolio et plongez dans l'univers de mes créations, où chaque projet raconte une histoire unique et témoigne de mon engagement envers l'excellence et l'innovation dans le domaine du développement web.
            </p>
            
            <Image
            src="/images/ma_photo_IA.webp"
            alt="mon-logo"
            width={300}
            height={10}
            className="rounded-full py-10"
            />
          </div>

      </div>
    </section>
  );
};

export default About;
