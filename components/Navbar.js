"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <div className="sticky">
      <ul className="flex justify-between m-5 items-center">
        <div className="text-xl">
          <Link href="/">
            <li className="flex items-center justify-center gap-2">
              <Image src="/contact-icon.png" alt="contact-icon" width={40} height={40} />
              Contacts
            </li>
          </Link>
        </div>
        <div className="text-xl flex gap-10">
          {!session ? (
            <>
              <Link href="/login">
                <li>
                  Login
                </li>
              </Link>
              <Link href="/register">
                <li>
                  Register
                </li>
              </Link>
            </>
          ) : (
            <>
              <div className="flex gap-9 items-center justify-center">
                <div className="xs:hidden sm:hidden">
                  Logged User: {session.user?.email}
                </div>
                <li>
                  <button className="p-1 px-5 -mt-1 bg-blue-800 text-lg rounded-full"
                    onClick={() => {
                      signOut()
                    }}
                  >
                    Logout
                  </button>
                </li>
              </div>
            </>
          )}

        </div>
      </ul>
    </div>
  )
}

export default Navbar