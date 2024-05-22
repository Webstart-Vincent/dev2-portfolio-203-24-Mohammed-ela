import dbConnect from '@/lib/mangoose.js'; 
import Project from '@/models/Project.js';

export default async function handler(req, res) {
  const {
    query: { slug },
    method,
    body,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const projects = slug ? await Project.find({ slug: slug }) : await Project.find({});
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        console.log('Données reçues :', body);  // Ajout de log
        const project = await Project.create(body); 
        console.log('Projet créé :', project); // Ajout de log pour vérifier les données enregistrées
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        console.error("Erreur lors de la création du projet", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      if (!slug) {
        return res.status(400).json({ success: false, error: "Slug is required for updates" });
      }
      try {
        const project = await Project.findOneAndUpdate({ slug: slug }, body, {
          new: true,
          runValidators: true,
        });
        if (!project) {
          return res.status(404).json({ success: false, error: "Project not found" });
        }
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      if (!slug) {
        return res.status(400).json({ success: false, error: "Slug is required for deletion" });
      }
      try {
        const deletedProject = await Project.findOneAndDelete({ slug: slug });
        if (!deletedProject) {
          return res.status(404).json({ success: false, error: "Project not found" });
        }
        res.status(200).json({ success: true, data: deletedProject });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
