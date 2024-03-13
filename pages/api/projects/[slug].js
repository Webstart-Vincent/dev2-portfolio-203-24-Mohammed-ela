import dbConnect from '@/app/lib/mangoose.js'; 
import Project from '@/app/models/Project.js';


export default async function handler(req, res) {
    const {
        query: { slug },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        case 'GET': // Trouver un projet par slug
            try {
                const project = await Project.findOne({ slug });
                if (!project) {
                    return res.status(404).json({ success: false, error: "Projet non trouvé" });
                }
                res.status(200).json({ success: true, data: project });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case 'PUT': // Mettre à jour un projet par slug
            try {
                const project = await Project.findOneAndUpdate({ slug }, req.body, { new: true, runValidators: true });
                if (!project) {
                    return res.status(404).json({ success: false, error: "Projet non trouvé" });
                }
                res.status(200).json({ success: true, data: project });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case 'DELETE': // Supprimer un projet par slug
            try {
                const deletedProject = await Project.findOneAndDelete({ slug });
                if (!deletedProject) {
                    return res.status(404).json({ success: false, error: "Projet non trouvé" });
                }
                res.status(204).json({ success: true });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
