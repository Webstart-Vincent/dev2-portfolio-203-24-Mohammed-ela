'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Si la session n'est pas chargée ou si l'utilisateur n'est pas connecté, rediriger vers la page d'accueil
    if (status !== 'loading' && !session) {
      router.push('/'); // Remplacez '/' par le chemin de votre page d'accueil ou de connexion
    }
  }, [session, status, router]);

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
