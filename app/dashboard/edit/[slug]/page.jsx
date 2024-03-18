"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Spinner from '@/components/spinner.js';

const EditProject = () => {
    const { data: session, status } = useSession();
    const router = useRouter()
    const [project, setProject] = useState({ 
        titre: '', 
        description: '',
        image: '',
        github: '',
        website: '',
    });
    // useEffect(() => {
    //     // Vérifie si le router est prêt avant de continuer
    //     if (router.isReady) {
    //         const { slug } = router.query;
    //         console.log("monslug"+slug);
    //         const fetchProjects = () => {
    //             fetch('/api/projects/page')
    //                 .then((res) => res.json())
    //                 .then((data) => {
    //                     if (data.success) {
    //                         setProject(data.data);
    //                     }
    //                 })
    //                 .catch((error) => console.error("Erreur lors de la récupération des projets", error));
    //         };
    //         fetchProject();
    //     }
    // }, [router.isReady, router.query]);

    useEffect(() => {
        // Cette vérification s'assure que le code s'exécute uniquement côté client
        if (typeof window !== "undefined") {
            const pathArray = window.location.pathname.split('/');
            const slugIndex = pathArray.findIndex(element => element === "edit") + 1;
            const slug = pathArray[slugIndex];
    
            if (slug) {
                // Assure-toi que fetchProjects accepte un slug et le traite correctement
                fetchProjects(slug);
            }
        }
    }, []);
    
    const fetchProjects = (slug) => {
        // Remplace '/api/projects/page' par l'endpoint correct qui utilise le slug
        fetch(`/api/projects/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProject(data.data);
                } else {
                    console.error("Projet non trouvé");
                    // Gérer le cas où le projet n'est pas trouvé
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des projets", error);
                // Gérer les erreurs de requête ici
            });
    };
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
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
          <div className="flex justify-center">
          
          <button type="submit" className="bg-indigo hover:bg-purple text-white font-bold py-2 px-4 rounded">Mettre à jour le projet</button>
        </div>
        </form>
      </>
      
    );
};

export default EditProject;