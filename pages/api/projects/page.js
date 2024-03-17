import dbConnect from '@/app/lib/mangoose.js'; 
import works from '@/app/models/Project.js';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const projects = await works.find({});
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const project = await works.create(req.body);
        res.status(201).json({ success: true, data: works });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    
    default:
      res.setHeader('Allow', ['GET', 'POST']); // Mettre à jour avec les méthodes autorisées
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
