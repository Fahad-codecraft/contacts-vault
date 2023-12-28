import Contact from "@/models/Contact";
import connectDB from "@/utils/db";

export const GET = async (request, { params }) => {
  try {
    await connectDB()
   
    const contacts = await Contact.find({
      creator: params.id
    }).populate('creator')
    return new Response(JSON.stringify(contacts), { status: 200 })
  } catch (error) {
    return new Response(error, { status: 500 })
  }
}
