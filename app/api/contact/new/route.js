import Contact from "@/models/Contact";
import connectDB from "@/utils/db";

export const POST = async (request) => {
  const { userId, name, email, phone, jobtitle, note } = await request.json();

  try {
    await connectDB();
    const newContact = new Contact({ creator: userId, name, email, phone, jobtitle, note });

    await newContact.save()
    return new Response(JSON.stringify(newContact), { status: 201 })
  } catch (error) {
    return new Response("Failed to create a new contact", { status: 500 })
  }
}