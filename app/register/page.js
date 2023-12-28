"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession()

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace("/contacts")
    }
  }, [sessionStatus, router])

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid")
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid")
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered")
      } if (res.status === 200) {
        setError("")
        router.push("/login")
      }
    } catch (error) {
      setError("Error, try again")
      console.log(error);
    }
  }


  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>
  }

  return (
    sessionStatus !== "authenticated" && <div className="flex min-h-screen flex-col items-center justify-between p-6 w-full">
      <div className="p-8 rounded w-full h-full flex flex-col items-center justify-center shadow-md text-center">
        {/* text div */}
        <div>
          <h1 className="text-2xl lg:text-3xl text-center font-semibold mb-8 w-[350px] lg:w-[400px]">
            Register To Your Account
          </h1>
        </div>
        {/*full login div */}
        <div className='flex flex-col gap-3 lg:flex-row lg:gap-20'>
          {/* form div */}
          <div className='flex flex-col items-center justify-center lg:p-2'>
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
              <input
                type="text"
                placeholder="Email"
                required
                className="w-[350px] bg-[#222222] text-[gray] lg:w-[400px] rounded p-4 mb-4 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-[350px] bg-[#222222] text-[gray] lg:w-[400px] rounded p-4 focus:outline-none mb-4"
              />
              <button
                type="submit"
                className="w-[350px] bg-gradient-to-r from-[#00c299] from-34% via-[#9fca7d] via-67% to-[#f6d572] to-99% text-white p-4 rounded hover:opacity-50 lg:w-[400px] text-lg flex flex-row justify-start"
              >
                Register To Your Account →
              </button>
              <p className="text-red-600 w-[350px] lg:w-[400px] text-[16px] mt-4">{error && error}</p>
            </form>
          </div>
          <div className='flex flex-col items-center justify-center text-4xl '>
            <h1>/</h1>
          </div>
          {/* other login options */}
          <div className='flex flex-col items-center justify-center p-2'>
            <button className='w-[350px] lg:w-[400px] flex items-center justify-center gap-3 bg-black text-white p-4 border rounded hover:bg-gray-800 mb-4' onClick={() => { signIn("github") }}>
              <Image src="/github-logo.png" alt='github logo' width={25} height={25} />
              Sign Up With Github
            </button>

            <button className='w-[350px] lg:w-[400px] flex items-center justify-center gap-3 bg-black text-white p-4 border rounded hover:bg-gray-800 mb-4' onClick={() => { signIn("google") }}>
              <Image src="/google-logo.png" alt='google logo' width={25} height={25} />
              Sign Up With Google
            </button>
          </div>
        </div>
        <div className="text-center w-[400px] text-gray-500 mt-4">- OR -</div>
        <Link
          href="/login"
          className="block text-center text-white hover:underline mt-2 w-[400px]"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;
