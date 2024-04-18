
import dbConnect from '@/app/lib/mangoose.js'; 
import Project from '@/app/models/Project.js';
// import {CldImage} from 'next-cloudinary';

await dbConnect();
console.log('debut fonct generate:'); 
// retourne la list des slug de ma bdd
export async function generateStaticParams() {
    const works = await Project.find({});
    return works.map((work) => ({
        slug: work.slug,
    }));
}

console.log('debut page'); 
const Page = async ({ params }) => {
    const { slug } = params;
    const work = await Project.findOne({ slug });
    console.log(work);
    return (
        <>
            <h1>{work.titre}</h1> 
            <h1>{work.slug}</h1> 
            <h1>{work.github}</h1> 
            <h1>{work.website}</h1> 
            <h1>{work.description}</h1> 
            <h1>{work.titre_seo}</h1> 
            <h1>{work.description_seo}</h1> 
            {/* <CldImage src={work.image} /> */}
        </>
    );
};

export default Page;