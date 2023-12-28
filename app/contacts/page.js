
import Feed from '@/components/Feed'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Dashboard = async () => {

  const session = await getServerSession()
  if (!session) {
    redirect("/login")
  }
  return (
    <>
        <div>
          <Feed />
        </div>
    </>
  )
}

export default Dashboard