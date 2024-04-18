import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '@/app/lib/mangoose.js'; 

await dbConnect();
const works = await Project.find({});
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
            {

              works.map((work, index) => (
              <Link key={work.id} href={`/works/${work.slug}`} className='relative border border-white shadow-lg rounded-lg'>
                <span name='title-projet' className="absolute top-5 left-5 bg-blackbg p-2 rounded text-gray font-bold">{work.titre}</span>
               
              </Link>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

