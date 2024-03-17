"use client"
import Spinner from '@/components/spinner.js';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const ProjectObject = () => {
    const { data: session, status } = useSession();
    const [newProject, setNewProject] = useState({ 
    titre: '', 
    slug: '', 
    description: '',
    image: '',
    github: '',
    website: '',
});

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
                setNewProject({ 
                titre: '', 
                slug: '', 
                description: '',
                image: '',
                github: '',
                website: '', }); // Réinitialiser le formulaire
            }
            window.location.href = '/dashboard';
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet", error);
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
  <Link href="/dashboard" className="absolute top-[20%] left-[20%] underline" aria-label="liste des projets">&#8592; Retour</Link>

<form onSubmit={handleAddProject} className="max-w-lg mx-auto my-10 bg-purple2 p-6 rounded-lg shadow-lg">
  <div className="mb-4">
  <h1 className="text-3xl font-bold text-center text-gray-800 ">
  Ajouter un projet
  </h1>
    <label htmlFor="titre" className="block text-purple-500 text-sm font-bold mb-2">Titre</label>
    <input
      type="text"
      id="titre"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Website"
      value={newProject.website}
      onChange={(e) => setNewProject({ ...newProject, website: e.target.value })}
    />
  </div>
  <div className="mb-4">
    <label htmlFor="image" className="block text-purple-500 text-sm font-bold mb-2">Image</label>
    <input
      type="text"
      id="image"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Image"
      value={newProject.image}
      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
    />
  </div>
  <button type="submit" className="bg-indigo hover:bg-purple text-white font-bold py-2 px-4 rounded">Add Project</button>
</form>

        </>
    );
};

export default ProjectObject;
