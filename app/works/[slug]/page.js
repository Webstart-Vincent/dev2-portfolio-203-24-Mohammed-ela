// C:\Users\Mohammed\Desktop\portfolio-nextjs\app\works\[slug]\page.js
import dbConnect from '@/lib/mangoose.js'; 
import Project from '@/models/Project.js';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header.jsx';
import { FaHtml5, FaCss3Alt, FaReact, FaJs, FaCloudUploadAlt, FaSearch,FaNodeJs, FaDatabase, FaPython, FaAngular, FaPhp, FaSass, FaWordpress, FaDocker } from 'react-icons/fa';


await dbConnect();

async function fetchWork(slug) {
    return await Project.findOne({ slug });
}

// Fonction pour générer des chemins statiques
export async function generateStaticParams() {
    const works = await Project.find({});
    return works.map((work) => ({
        slug: work.slug,
    }));
}

const iconMapping = {
    'HTML5': <FaHtml5 className="mr-2 text-orange" />,
    'Design UX UI sous Figma': <FaCss3Alt className="mr-2 text-blue" />,
    'React / NextJS (SSR)': <FaReact className="mr-2 text-blue" />,
    'Typescript': <FaJs className="mr-2 text-yellow" />,
    'Déploiement sous Netlify': <FaCloudUploadAlt className="mr-2 text-green" />,
    'Optimisation SEO': <FaSearch className="mr-2 text-white" />,
    'Node.js': <FaNodeJs className="mr-2 text-green" />,
    'Base de données (SQL/NoSQL)': <FaDatabase className="mr-2 text-red" />,
    'Python': <FaPython className="mr-2 text-blue" />,
    'Angular': <FaAngular className="mr-2 text-red" />,
    'PHP': <FaPhp className="mr-2 text-purple" />,
    'Sass': <FaSass className="mr-2 text-pink" />,
    'WordPress': <FaWordpress className="mr-2 text-blue" />,
    'Docker': <FaDocker className="mr-2 text-blue" />
};


const Page = async ({ params }) => {
    const { slug } = params;
    const work = await fetchWork(slug);
    const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${work.image}`;

    return (
        <>
            <Header />
            <main className='px-5 sm:px-10 py-10 animate-fadeIn'>
                <h1 className="text-3xl font-bold mb-8 animate-slideIn">{work.titre}</h1>
                <div className="grid my-5 md:grid-cols-1 lg:grid-cols-2 gap-10 animate-slideIn">
                    <Link href="/#projets" className="absolute top-[20%] right-[5%] underline" aria-label="liste des projets">&#8592; Retour</Link>
                    <div className="relative group">
                        <Image 
                            alt={work.titre_seo}
                            src={imageUrl}
                            width={599} 
                            height={431} 
                            className="w-full h-auto border border-indigo rounded-lg transition-transform transform group-hover:scale-105 group-hover:shadow-xl duration-300"
                        />
                    </div>
                    <div className='flex flex-col justify-between animate-slideIn'>
                        <h2 className="pt-3 mb-3 text-2xl font-semibold sm:pt-5">Integration shoot ça</h2>
                        <p className="sm:w-4/5 mb-5">{work.description}</p>
                        <div className="mt-5">
                            <h2 className='mb-2 text-xl font-semibold'>Technologies :</h2>
                            <ul className="grid grid-cols-2 gap-4">
                                {work.technologies && work.technologies.map((tech, index) => (
                                    <li key={index} className="text-sm md:text-base flex flex-row items-center">
                                        {iconMapping[tech] || null}{tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between w-full sm:w-4/5 mt-5 gap-4">
                            {work.website && (
                                <Link href={work.website} passHref>
                                    <button 
                                    className="bg-purple text-white font-bold py-2 px-4 rounded-md w-full sm:w-auto transition-transform transform hover:scale-105 hover:bg-white hover:text-purple border border-purple">
                                    aria-label="le lien vers le site web"
                                    id="purple-button"
                                    data-tooltip-target="button ref"

                                        Le Site Web
                                    </button>
                                </Link>
                            )}
                            {work.github && (
                                <Link href={work.github} passHref>
                                    <button 
                                    className="bg-white text-purple font-bold py-2 px-4 rounded-md w-full sm:w-auto transition-transform transform hover:scale-105 hover:bg-purple hover:text-white border border-purple">
                                    aria-label="le lien vers le code github"
                                    id="purple-button"
                                    data-tooltip-target="button ref"
                                        Le Code source GitHub
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Page;
