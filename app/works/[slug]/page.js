//page.js
import WorkModel from '@/app/models/Project';
import { CldImage } from 'next-cloudinary'

export async function generateStaticParams() {
    const works = await WorkModel.find({})
    return works.map((work) => ({
        slug: work.slug,
    }))
}

const Page = async ({ params }) => {
    const { slug } = params
    const work = await WorkModel.findOne({ slug })

return(
    <>
    <h1>hello</h1>
        <h1>work.titre</h1>
        <CldImage src={work.image} />
    </>
)
}


export default Page