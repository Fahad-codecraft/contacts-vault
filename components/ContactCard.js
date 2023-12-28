"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const ContactCard = ({ contact, handleEdit, handleDelete }) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  return (
    <tr className="text-center">
      <td className="py-2">{contact.name}</td>
      <td className="py-2 xs:hidden">{contact.email}</td>
      <td className="py-2">{contact.phone}</td>
      <td className="py-2 xs:hidden sm:hidden">{contact.jobtitle}</td>
      <td className="py-2 xs:hidden sm:hidden md:hidden lg:hidden">{contact.note}</td>
      <td className="py-2" onClick={handleEdit}><button className="bg-gray-600 hover:bg-[orange] px-3 py-2 rounded-md">Edit</button></td>
      <td className="py-2" onClick={handleDelete}><button className="bg-gray-600 hover:bg-[red] px-3 py-2 rounded-md">Delete</button></td>
    </tr>
  );
};

export default ContactCard;