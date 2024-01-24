import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session, status } = useSession();

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
      <p>Utilisateur : {username !== undefined ? <><span>{username}</span><br></br> <a href='http://localhost:3000/api/auth/signout'>Déconnexion</a></> : <>Pas d'utilisateur <br></br> <a href='http://localhost:3000/api/auth/signin'>Connexion</a></>}</p>
    </>
  );
};

export default Dashboard;
