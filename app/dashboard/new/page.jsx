"use client"
import { CldUploadButton } from 'next-cloudinary';
import Spinner from '@/components/spinner.js';
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
    description_seo: '',
    titre_seo: '',
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
                website: '', 
                description_seo: '',
                titre_seo: '',
              }); 
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
  <label htmlFor="image" className="block text-purple-500 text-sm font-bold mb-2">Ajouter une Image</label>
  <div className="flex justify-center items-center">
  <CldUploadButton 
    uploadPreset="<Upload Preset>" 
    onSuccess={(response) => setNewProject({ ...newProject, image: response.public_id })}
    className="bg-red hover:bg-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
   Telecharger une image
  </CldUploadButton>
</div>

</div>

  <div className="mb-4">
    <label htmlFor="description_seo" className="block text-purple-500 text-sm font-bold mb-2">description_seo</label>
    <input
      type="text"
      id="description_seo"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="description_seo"
      value={newProject.description_seo}
      onChange={(e) => setNewProject({ ...newProject, description_seo: e.target.value })}
    />
  </div>
  <div className="mb-4">
    <label htmlFor="titre_seo" className="block text-purple-500 text-sm font-bold mb-2">Titre_seo</label>
    <input
      type="text"
      id="titre_seo"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="titre_seo"
      value={newProject.titre_seo}
      onChange={(e) => setNewProject({ ...newProject, titre_seo: e.target.value })}
    />
  </div>
  <div className="flex justify-center">
  
  <button type="submit" className="bg-indigo hover:bg-purple text-white font-bold py-2 px-4 rounded flex ">Add Project</button>
</div>

</form>

        </>
    );
};

export default ProjectObject;
