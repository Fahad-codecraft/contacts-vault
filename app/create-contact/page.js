"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { redirect } from "next/navigation"

import Form from "@/components/Form"

const CreateContact = () =>{
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const [submitting, setIsSubmitting] = useState(false);
  const [contact, setContact] = useState({name: "", email: "", phone: "", jobtitle: "", note: ""})

  useEffect(() => {
    if (sessionStatus !== 'authenticated') {
      redirect("/login")
    }
  }, [sessionStatus, router])

  const createContact = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/new", {
        method: "POST",
        body: JSON.stringify({
          name: contact.name,
          userId: session.user.id,
          email: contact.email,
          phone: contact.phone,
          jobtitle: contact.jobtitle,
          note: contact.note,
        })
      })
      if (response.ok){
        router.push("/contacts");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>
  }

  return(
    <Form 
      type="Create"
      contact={contact}
      setContact={setContact}
      submitting={submitting}
      handleSubmit={createContact}
    />
  )
}

export default CreateContact