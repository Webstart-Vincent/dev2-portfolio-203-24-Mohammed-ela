"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Spinner from '@/components/spinner.js';
import { FaHtml5, FaCss3Alt, FaReact, FaJs, FaCloudUploadAlt, FaSearch, FaNodeJs, FaDatabase, FaPython, FaAngular, FaPhp, FaSass, FaWordpress, FaDocker } from 'react-icons/fa';

const technologiesList = [
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

const EditProject = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [project, setProject] = useState({
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathArray = window.location.pathname.split('/');
            const slugIndex = pathArray.findIndex(element => element === "edit") + 1;
            const slug = pathArray[slugIndex];

            if (slug) {
                fetchProject(slug);
            }
        }
    }, []);

    const fetchProject = (slug) => {
        fetch(`/api/projects/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProject(data.data);
                } else {
                    console.error("Projet non trouvé");
                }
                setLoading(false); // Stop loading when data is fetched
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des projets", error);
                setLoading(false); // Stop loading in case of error
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const handleTechnologyToggle = (techName) => {
        setProject((prevProject) => {
            const newTechnologies = prevProject.technologies.includes(techName)
                ? prevProject.technologies.filter((tech) => tech !== techName)
                : [...prevProject.technologies, techName];
            return { ...prevProject, technologies: newTechnologies };
        });
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        const pathArray = window.location.pathname.split('/');
        const slugIndex = pathArray.findIndex(element => element === "edit") + 1;
        const slug = pathArray[slugIndex];

        try {
            const res = await fetch(`/api/projects/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            });
            const data = await res.json();
            if (data.success) {
                router.push('/dashboard'); // Redirection après mise à jour
            } else {
                console.error("Erreur lors de la mise à jour du projet");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du projet", error);
        }
    };

    if (status === 'loading' || loading) {
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
            {/* Menu nav */}
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

            <form onSubmit={handleUpdateProject} className="max-w-lg mx-auto my-10 bg-purple p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Modifier le projet</h1>

                {/* Titre */}
                <div className="mb-4">
                    <label htmlFor="titre" className="block text-purple-500 text-sm font-bold mb-2">Titre</label>
                    <input
                        type="text"
                        id="titre"
                        name="titre"
                        value={project.titre}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-black"
                        required
                    />
                </div>

                {/* Slug */}
                <div className="mb-4">
                    <label htmlFor="slug" className="block text-purple-500 text-sm font-bold mb-2">Slug</label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={project.slug}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-black"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-purple-500 text-sm font-bold mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={project.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-black"
                        required
                    ></textarea>
                </div>

                {/* GitHub */}
                <div className="mb-4">
                    <label htmlFor="github" className="block text-purple-500 text-sm font-bold mb-2">GitHub</label>
                    <input
                        type="text"
                        id="github"
                        name="github"
                        value={project.github}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-black"
                    />
                </div>

                {/* Site Web */}
                <div className="mb-4">
                    <label htmlFor="website" className="block text-purple-500 text-sm font-bold mb-2">Site Web</label>
                    <input
                        type="text"
                        id="website"
                        name="website"
                        value={project.website}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-black"
                    />
                </div>

                {/* Image */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-purple-500 text-sm font-bold mb-2">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={project.image}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-black"
                    />
                </div>

                {/* Description SEO */}
                <div className="mb-4">
                    <label htmlFor="description_seo" className="block text-purple-500 text-sm font-bold mb-2">Description SEO</label>
                    <input
                        type="text"
                        id="description_seo"
                        name="description_seo"
                        value={project.description_seo}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-black"
                    />
                </div>

                {/* Titre SEO */}
                <div className="mb-4">
                    <label htmlFor="titre_seo" className="block text-purple-500 text-sm font-bold mb-2">Titre SEO</label>
                    <input
                        type="text"
                        id="titre_seo"
                        name="titre_seo"
                        value={project.titre_seo}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-black"
                    />
                </div>

                {/* Technologies */}
                <div className="mb-4">
                    <label htmlFor="technologies" className="block text-purple-500 text-sm font-bold mb-2">Technologies</label>
                    <div className="flex flex-wrap gap-2">
                        {technologiesList.map((tech) => (
                            <button
                                type="button"
                                key={tech.id}
                                onClick={() => handleTechnologyToggle(tech.name)}
                                className={`py-2 px-4 rounded ${project.technologies.includes(tech.name) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                            >
                                {tech.icon}
                                {tech.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="bg-indigo hover:bg-purple text-white font-bold py-2 px-4 rounded">Mettre à jour le projet</button>
                </div>
            </form>
        </>
    );
};

export default EditProject;
