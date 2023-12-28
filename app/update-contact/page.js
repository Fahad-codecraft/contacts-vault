"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@/components/Form"

const EditPrompt = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const contactId = searchParams.get('id')
  console.log(contactId)

  const [submitting, setIsSubmitting] = useState(false);
  const [contact, setContact] = useState({name: "", email: "", phone: "", jobtitle: "", note: ""})

  useEffect(() => {
    const getContactDetails = async() => {
      const response = await fetch(`api/contact/${contactId}`)

      const data = await response.json()
      setContact({
        name: data.name,
        email: data.email,
        phone: data.phone,
        jobtitle: data.jobtitle,
        note: data.note
      })
    }

    if(contactId) getContactDetails()
  }, [contactId])

  const updatePrompt = async(e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if(!contactId) return alert('Contact Id Not found')

    try {
      const response = await fetch(`/api/contact/${contactId}`, {
        method: "PATCH",
         body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          jobtitle: contact.jobtitle,
          note: contact.note,
        })
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return(
    <Form 
      type="Edit"
      contact={contact}
      setContact={setContact}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt