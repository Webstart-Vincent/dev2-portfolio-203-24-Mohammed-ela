//C:\Users\Mohammed\Desktop\portfolio-nextjs\app\dashboard\new\page.jsx
"use client"
import { CldUploadButton } from 'next-cloudinary';
import Spinner from '@/components/spinner.js';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaHtml5, FaCss3Alt, FaReact, FaJs, FaCloudUploadAlt, FaSearch,FaNodeJs, FaDatabase, FaPython, FaAngular, FaPhp, FaSass, FaWordpress, FaDocker } from 'react-icons/fa';

const technologies = [
    { id: 1, name: 'HTML5', icon: <FaHtml5 className="mr-2 text-orange" /> },
    { id: 2, name: 'Design UX UI sous Figma', icon: <FaCss3Alt className="mr-2 text-blue" /> },
    { id: 3, name: 'React / NextJS (SSR)', icon: <FaReact className="mr-2 text-blue" /> },
    { id: 4, name: 'Typescript', icon: <FaJs className="mr-2 text-yellow" /> },
    { id: 5, name: 'Déploiement sous Netlify', icon: <FaCloudUploadAlt className="mr-2 text-green" /> },
    { id: 6, name: 'Optimisation SEO', icon: <FaSearch className="mr-2 text-white" /> },
    { id: 7, name: 'Node.js', icon: <FaNodeJs className="mr-2 text-green" /> },
    { id: 8, name: 'Base de données (SQL/NoSQL)', icon: <FaDatabase className="mr-2 text-red" /> },
    { id: 9, name: 'Python', icon: <FaPython className="mr-2 text-blue" /> },
    { id: 10, name: 'Angular', icon: <FaAngular className="mr-2 text-red" /> },
    { id: 11, name: 'PHP', icon: <FaPhp className="mr-2 text-purple" /> },
    { id: 12, name: 'Sass', icon: <FaSass className="mr-2 text-pink" /> },
    { id: 13, name: 'WordPress', icon: <FaWordpress className="mr-2 text-blue" /> },
    { id: 14, name: 'Docker', icon: <FaDocker className="mr-2 text-blue" /> }
  ];
const ProjectObject = () => {
    const { data: session, status } = useSession();
    const [newProject, setNewProject] = useState({ 
        titre: '', 
        slug: '', 
        description: '',
        image: '',
        github: '',
        website: '',
        description_seo: '',
        titre_seo: '', 
        technologies: [], 
    });
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const handleAddProject = async (e) => {
        e.preventDefault();
        console.log('Données envoyées :', newProject);
        try {
            const res = await fetch('/api/projects/page', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });
            const data = await res.json();
            if (data.success) {
                setNewProject({ 
                    titre: '', 
                    slug: '', 
                    description: '',
                    image: '',
                    github: '',
                    website: '', 
                    description_seo: '',
                    titre_seo: '',
                    technologies: [], 
                }); 
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet", error);
        }
    };
    

    const handleTechnologyToggle = (techName) => {
        setNewProject((prevProject) => {
            const newTechnologies = prevProject.technologies.includes(techName)
                ? prevProject.technologies.filter((tech) => tech !== techName)
                : [...prevProject.technologies, techName];
            console.log('Technologies mises à jour :', newTechnologies); // Ajout de log
            return { ...prevProject, technologies: newTechnologies };
        });
    };
    

    if (status === 'loading') {
        return <Spinner />;
    }
      
    const username = session?.user?.name;
    if (!username) {
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        return <p>Redirection vers la page d'accueil...</p>;
    }

    return (
        <>
            <nav className="bg-blackbg p-4 flex justify-between items-center">
                <Link href="/">
                    <div className="font-bold py-2 px-4">Portfolio</div>
                </Link>
                <div className="flex items-center">
                    <span className="text-gray mr-4">Utilisateur : {username}</span>
                    <Link href="/api/auth/signout">
                        <div className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Déconnexion</div>
                    </Link>
                </div>
            </nav>
            <Link href="/dashboard" className="absolute top-[20%] left-[20%] underline" aria-label="liste des projets">&#8592; Retour</Link>

            <form onSubmit={handleAddProject} className="max-w-lg mx-auto my-10 bg-purple p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Ajouter un projet</h1>
                <div className="mb-4">
                    <label htmlFor="titre" className="block text-purple-500 text-sm font-bold mb-2">Titre</label>
                    <input
                        type="text"
                        id="titre"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Titre"
                        value={newProject.titre}
                        onChange={(e) => setNewProject({ ...newProject, titre: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="slug" className="block text-purple-500 text-sm font-bold mb-2">Slug</label>
                    <input
                        type="text"
                        id="slug"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Slug"
                        value={newProject.slug}
                        onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-purple-500 text-sm font-bold mb-2">Description</label>
                    <textarea
                        id="description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="github" className="block text-purple-500 text-sm font-bold mb-2">Github</label>
                    <input
                        type="text"
                        id="github"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Github"
                        value={newProject.github}
                        onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="website" className="block text-purple-500 text-sm font-bold mb-2">Site Web</label>
                    <input
                        type="text"
                        id="website"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Website"
                        value={newProject.website}
                        onChange={(e) => setNewProject({ ...newProject, website: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description_seo" className="block text-purple-500 text-sm font-bold mb-2">Description SEO</label>
                    <input
                        type="text"
                        id="description_seo"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Description SEO"
                        value={newProject.description_seo}
                        onChange={(e) => setNewProject({ ...newProject, description_seo: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="titre_seo" className="block text-purple-500 text-sm font-bold mb-2">Titre SEO</label>
                    <input
                        type="text"
                        id="titre_seo"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Titre SEO"
                        value={newProject.titre_seo}
                        onChange={(e) => setNewProject({ ...newProject, titre_seo: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-purple-500 text-sm font-bold mb-2">Ajouter une Image</label>
                    <CldUploadButton 
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                        onSuccess={(response) => {
                            console.log('Réponse Cloudinary:', response);
                            const publicId = response.info.public_id;
                            console.log('Public ID:', publicId);
                            setNewProject(current => ({ ...current, image: publicId }));
                            setIsImageUploaded(true); 
                        }}
                        className="bg-red hover:bg-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Télécharger une image
                    </CldUploadButton>
                </div>
                <div className="mb-4">
                    <label htmlFor="technologies" className="block text-purple-500 text-sm font-bold mb-2">Technologies</label>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                            <button
                                type="button"
                                key={tech.id}
                                onClick={() => handleTechnologyToggle(tech.name)}
                                className={`py-2 px-4 rounded ${newProject.technologies.includes(tech.name) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                            >
                                {tech.icon}
                                {tech.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="submit" disabled={!isImageUploaded} className="bg-indigo hover:bg-purple text-white font-bold py-2 px-4 rounded flex">Ajouter le projet</button>
                </div>
            </form>
        </>
    );
};

export default ProjectObject;
