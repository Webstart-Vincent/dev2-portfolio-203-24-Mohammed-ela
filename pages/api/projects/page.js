import dbConnect from '@/app/lib/mangoose.js'; 
import Project from '@/app/models/Project.js';


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
        // Si 'slug' est fourni dans la requête, recherche ce projet spécifique, sinon renvoie tous les projets
        const projects = slug ? await Project.find({ slug: slug }) : await Project.find({});
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const project = await Project.create(body); 
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      // Assure-toi que 'slug' est passé pour identifier le projet à mettre à jour
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
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

