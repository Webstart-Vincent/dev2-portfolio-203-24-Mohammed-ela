// C:\Users\Mohammed\Desktop\portfolio-nextjs\models\Project.js
import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  slug: { type: String, required: true },
  image: String,
  github: String,
  website: String,
  description: String,
  titre_seo: String,
  description_seo: String,
  technologies: { type: [String], default: [] }
}, { collection: 'works' });

const Project = mongoose.models.works || mongoose.model('works', workSchema);

export default Project;

