// Importez les dépendances nécessaires
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PortfolioItem from '@/components/projet.jsx';

// Définissez votre tableau de projets en dehors des composants, si ce tableau est commun. Sinon, déplacez-le à l'intérieur du composant qui l'utilise.
const projects = [
  {
    id: 'shoot-ca',
    title: 'Project One',
    description: 'Lorem ipsum dolor sit amet',
    gitLink: 'https://github.com/project-one',
    image: 'project1.jpg',
    technologies: ['React', 'JavaScript', 'CSS'],
  },
  // Ajoutez d'autres projets ici au besoin
];
console.log('helloworld');
// Composant ProjectDetail pour afficher le détail d'un projet
function ProjectDetail() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    setIsMounted(true); // Une fois le composant monté, setIsMounted passe à true
    // Assurez-vous que l'ID est disponible avant de rechercher le projet
    if (router.isReady) {
      const { id } = router.query;
      const foundProject = projects.find(p => p.id === id);
      setProject(foundProject);
    }
  }, [router.isReady, router.query]);

  if (!isMounted || !project) {
    return <div>Chargement du projet...</div>; // Ou un loader/placeholder pendant que le projet n'est pas encore chargé
  }

  // Utilisation des propriétés du projet trouvé
  return (
    <PortfolioItem
      title={project.title}
      description={project.description}
      gitLink={project.gitLink}
      image={project.image}
      technologies={project.technologies}
    />
  );
}

// Exportez ProjectDetail comme composant par défaut du fichier
export default ProjectDetail;
