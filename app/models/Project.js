//Project.js
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

}, { collection: 'works' }); 

const work = mongoose.models.works || mongoose.model('works', workSchema);

export default work;
