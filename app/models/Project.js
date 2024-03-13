import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  titre: String,
  slug: { type: String, unique: true },
  image: String,
  github: String,
  website: String,
  description: String,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
