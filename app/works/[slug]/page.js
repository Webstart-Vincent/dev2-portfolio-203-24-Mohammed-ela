import { WorkModel } from '@/app/models/works'
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
        <h1>work.title</h1>
        <CldImage src={work.imgId} />
    </>
)
}

export default Page