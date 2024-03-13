"use client"
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ titre: '', slug: '', description: '' });

    // Récupérer les projets au chargement du composant
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        fetch('api/projects/page') // Assurez-vous que l'URL est correcte pour votre config
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProjects(data.data);
                }
            });
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('api/projects/page', { // URL à vérifier
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });
            const data = await res.json();
            if (data.success) {
                fetchProjects(); // Recharger les projets après l'ajout
                setNewProject({ titre: '', slug: '', description: '' }); // Réinitialiser le formulaire
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet", error);
        }
    };

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
        return <p>Chargement en cours...</p>;
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
            <Head>
                <title>Tableau de bord</title>
            </Head>
            <h1>Tableau de bord</h1>
            <p>Utilisateur : {username}</p>
            <div>
                <h2>Ajouter un projet</h2>
                <form onSubmit={handleAddProject}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={newProject.titre}
                        onChange={(e) => setNewProject({ ...newProject, titre: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Slug"
                        value={newProject.slug}
                        onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        required
                    />
                    <button type="submit">Ajouter</button>
                </form>
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
