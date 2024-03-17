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
// CREATE 
    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/projects/page', { // URL à vérifier
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });
            const data = await res.json();
            if (data.success) {
                fetchProjects(); // Recharger les projets après l'ajout
                setNewProject({ 
                titre: '', 
                slug: '', 
                description: '',
                image: '',
                github: '',
                website: '', }); // Réinitialiser le formulaire
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet", error);
        }
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
            <h1>Tableau de bord</h1>
            <p>Utilisateur : {username}</p>
            <div>
            <Link href="/new">
                <a className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
                Click here to Add Project
                </a>
            </Link>
            </div>
            <div>
                <h2>Liste des projets</h2>
                {projects.map((project) => (
                    <div key={project._id}>
                        <h3>{project.titre}</h3>
                        <p>{project.description}</p>
                        {/* Bouton de suppression */}
                        <button onClick={() => handleDeleteProject(project.slug)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Dashboard;
