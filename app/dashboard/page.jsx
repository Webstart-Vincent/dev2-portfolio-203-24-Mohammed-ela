'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'; // Importer useRouter

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // Utiliser le hook useRouter

  // Rediriger vers la page d'accueil si l'utilisateur n'est pas connecté
  if (status === 'unauthenticated') {
    router.push('/'); // Remplacez '/' par le chemin de votre page d'accueil si différent
    return null; // Renvoie null pour éviter d'afficher un contenu avant la redirection
  }

  // Vérifier si la session est en cours de chargement
  if (status === 'loading') {
    return <p>Chargement en cours...</p>;
  }

  // Vérifier si la session est définie
  const username = session?.user?.name;

  // Afficher le contenu du tableau de bord
  return (
    <>
      <h1>Tableau de bord</h1>
      <p>Utilisateur : {username !== undefined ? username : 'Pas d\'utilisateur'}</p>
    </>
  );
};

export default Dashboard;
