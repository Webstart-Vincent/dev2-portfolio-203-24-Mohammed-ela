// edit/[slug].jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Spinner from '@/components/spinner.js';

const EditProjectPage = () => {
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
        if (router.isReady) {
            const fetchProject = async () => {
                try {
                    const response = await fetch(`/api/projects/${slug}`);
                    const data = await response.json();
                    if (data.success) {
                        setProject(data.data); // Assumer que data.data contient le projet
                    } else {
                        console.error("Projet non trouvé");
                        router.push('/dashboard');
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération du projet", error);
                    router.push('/dashboard');
                }
            };
            fetchProject();
        }
    }, [router.isReady, slug]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({
            ...project,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/projects/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            });
            if (res.ok) {
                router.push('/dashboard'); // Redirection après la mise à jour
            } else {
                console.error("Erreur lors de la mise à jour du projet");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du projet", error);
        }
    };

    if (status === 'loading') {
        return <Spinner />;
    }

    if (!session) {
        if (typeof window !== 'undefined') {
            window.location.href = '/';
        }
        return <p>Redirection vers la page d'accueil...</p>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-5">Modifier le projet: {project.titre}</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10 bg-purple-200 p-6 rounded-lg shadow-lg">
                {/* Ici, tu répètes le schéma pour chaque champ comme dans l'exemple précédent */}
                {/* Exemple pour le champ titre */}
                <div className="mb-4">
                    <label htmlFor="titre" className="block text-purple-500 text-sm font-bold mb-2">Titre</label>
                    <input type="text" id="titre" name="titre" value={project.titre} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                {/* Ajouter les autres champs ici */}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Mettre à jour</button>
                <Link href="/dashboard"><a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-4">Annuler</a></Link>
            </form>
        </div>
    );
};

export default EditProjectPage;
