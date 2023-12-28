import Contact from "@/models/Contact";
import connectDB from "@/utils/db";

export const GET = async (request, { params }) => {
  try {
    await connectDB()
    const contact = await Contact.findById(params.id).populate('creator')
    if (!contact) return new Response("Contact not found", { status: 404 })
    return new Response(JSON.stringify(contact), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { name, email, phone, jobtitle, note } = await request.json()

  try {
    await connectDB()
    const existingContact = await Contact.findById(params.id)
    if (!existingContact) return new Response("Contact not found", { status: 404 })

    existingContact.name = name
    existingContact.email = email
    existingContact.phone = phone
    existingContact.jobtitle = jobtitle
    existingContact.note = note

    await existingContact.save()
    return new Response(JSON.stringify(existingContact), { status: 200 })
  } catch (error) {
    return new Response("Failed to update Contact", { status: 500 })
  }
}

export const DELETE = async(request, {params}) => {
  try {
    await connectDB()
    await Contact.findByIdAndDelete(params.id)
    return new Response("Contact deleted successfully", { status: 200 })
  } catch (error) {
    return new Response(error, { status: 500 })
  }
}