import Feed from "@/components/Feed"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


export default async function Home() {
  const session = await getServerSession()
  if (!session) {
    redirect("/login")
  }

  // if(session) {
  //   redirect("/contacts")
  // }
  return (
    <main className="flex p-6">
      <Feed />
    </main>
  )
}
