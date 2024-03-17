"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const EditProject = () => {
    const { data: session, status } = useSession();
    const [project, setProject] = useState({
        titre: '',
        description: '',
        image: '',
        github: '',
        website: '',
    });
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (slug) {
            // Remplacer '/api/projects/${slug}' par l'URL exacte de ton API
            fetch(`/api/projects/${slug}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success && data.data) {
                        // Assure-toi que cette partie correspond au format de réponse de ton API
                        setProject(data.data);
                    } else {
                        router.push('/dashboard'); // Redirige si le projet n'est pas trouvé
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération du projet", error);
                    router.push('/dashboard'); // Gestion des erreurs
                });
        }
    }, [slug, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Mettre à jour le projet via l'API
        try {
            const res = await fetch(`/api/projects/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            });

            if (res.ok) {
                router.push('/dashboard'); // Redirection vers le tableau de bord après mise à jour
            } else {
                console.error("Erreur lors de la mise à jour du projet");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du projet", error);
        }
    };

    if (status === 'loading') {
        return <p>Chargement...</p>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-5">Modifier le projet</h1>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <div className="mb-4">
                    <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
                    <input type="text" name="titre" id="titre" value={project.titre} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" id="description" value={project.description} onChange={handleChange} rows="3" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"></textarea>
                </div>

                {/* Répète ce schéma pour les autres champs comme 'image', 'github', 'website' */}

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Mettre à jour</button>
                <Link href="/dashboard">
                    <a className="px-4 py-2 ml-4 bg-gray-500 text-white rounded hover:bg-gray-700">Annuler</a>
                </Link>
            </form>
        </div>
    );
};

export default EditProject;
