"use client"
import Spinner from '@/components/spinner.js';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ 
    titre: '', 
    slug: '', 
    description: '',
    image: '',
    github: '',
    website: '',
});


const url_img = '/images/';
    // on charge les projets
    useEffect(() => {
        fetchProjects();
    }, []);

// READ
    const fetchProjects = () => {
        fetch('/api/projects/page')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProjects(data.data);
                }
            })
            .catch((error) => console.error("Erreur lors de la récupération des projets", error));
    };

// DELETE
    const handleDeleteProject = async (slug) => {
        try {
            const res = await fetch(`/api/projects/${slug}`, { // URL à vérifier
                method: 'DELETE',
            });
            if (res.ok) {
                fetchProjects(); // Recharger les projets après la suppression
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du projet", error);
        }
    };



 // Vérifier si la session est en cours de chargement
 if (status === 'loading') {
    return <Spinner />;
  }
  

// Vérifier si la session est définie
const username = session?.user?.name;
if (!username) {
    // Redirection côté client vers la page d'accueil
    if (typeof window !== 'undefined') {
        window.location.href = '/';
    }
    return <p>Redirection vers la page d'accueil...</p>;
}
   

    return (

          <>
          {/* menu nav */}
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
{/* titre */}
    <div className="text-center my-6">
        <h2 className="text-3xl text-white font-semibold">Bienvenue dans le tableau de bord</h2>
        <Link href="/dashboard/new">
            <div className="inline-block mt-4 px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
            &#x2192; Ajouter un projet &#x2190;
            
            </div>
            
        </Link>
        <div className='mt-5'>Nombre de projets : {projects.length}</div>
    </div>

{/* lsite proejt */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
  {projects.map((project) => (
    <div key={project._id} className="bg-purple-700 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
    <div className="relative w-full h-56">
        <Image
          src={url_img + project.image}
          alt={project.image}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl text-white font-bold mb-2">{project.titre}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>

        <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-500 transition-colors duration-300">Lien du site : {project.website}</a>
        <br />
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-500 transition-colors duration-300">Dépot GitHub : {project.github}</a>
      </div>

      <div className="flex justify-between items-center p-4">
        <Link href={`/dashboard/edit/${project.slug}`}>
        <div className="bg-indigo hover:bg-[#5b21b6] text-white font-bold py-2 px-4 rounded transition duration-300">
    Modifier
</div>

        </Link>
        <button onClick={() => handleDeleteProject(project.slug)} className="bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold py-2 px-4 rounded transition duration-300">
    Supprimer
</button>

      </div>
    </div>
  ))}
</div>



</>


    );
};

export default Dashboard;
