import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  slug: { type: String, required: true },
  image: String,
  github: String,
  website: String,
  description: String,
}, { collection: 'works' }); 

const works = mongoose.models.works || mongoose.model('works', workSchema);

export default works;
