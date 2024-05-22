import dbConnect from '@/lib/mangoose.js'; 
import Project from '@/models/Project.js';

//recup liste projet gallery
export default async function handler(req, res) {
    await dbConnect();
    try {
        const projects = await Project.find({});
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
