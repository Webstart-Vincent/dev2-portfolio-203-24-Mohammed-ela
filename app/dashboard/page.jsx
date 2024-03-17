"use client"
import Spinner from '@/components/spinner.js';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

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
          <>
    <nav className="bg-blackbg p-4 flex justify-between items-center">
        <h1 className="text-white text-lg">Tableau de bord</h1>
        <div className="flex items-center">
            <span className="text-gray mr-4">Utilisateur : {username}</span>
            <Link href="/logout">
                <div className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Déconnexion</div>
            </Link>
        </div>
    </nav>

    <div className="text-center my-6">
        <h2 className="text-3xl text-white font-semibold">Bienvenue dans le tableau de bord</h2>
        <Link href="/dashboard/new">
            <div className="inline-block mt-4 px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
                Ajouter un projet
            </div>
        </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {projects.map((project) => (
            <div key={project._id} className="bg-blackbg p-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out">
                <h3 className="text-xl text-white font-bold">{project.titre}</h3>
                <p className="text-gray-300">{project.description}</p>
                <button onClick={() => handleDeleteProject(project.slug)} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
                    Supprimer
                </button>
            </div>
        ))}
    </div>
</>

        </>
    );
};

export default Dashboard;
