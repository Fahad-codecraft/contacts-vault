"use client";
import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ContactCardList = ({ data, handleEdit, handleDelete }) => {
  return (
    data.map((contact) => (
      <ContactCard
        key={contact._id}
        contact={contact}
        handleEdit={() => handleEdit(contact._id)}
        handleDelete={() => handleDelete(contact._id)}
      />
    ))
  )
}


const Feed = () => {
  const [allContacts, setAllContacts] = useState([]);
  const { data: session, status: sessionStatus } = useSession();
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const router = useRouter()

  const fetchContacts = async () => {
    const response = await fetch(`/api/users/${session.user.id}/contacts`);
    const data = await response.json();

    setAllContacts(data)
  }

  useEffect(() => {
    if (session?.user.id) fetchContacts();
  }, [session?.user.id]);

  const filterContacts = (searchtext) => {
    const escapedSearchText = searchtext.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearchText, "i"); // 'i' flag for case-insensitive search
    return allContacts.filter(
      (item) =>
        regex.test(item.name) ||
        regex.test(item.email) ||
        regex.test(item.phone)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterContacts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleEdit = (contact) => {
    router.push(`/update-contact?id=${contact}`);
  };

  const handleDelete = async (contact) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/contact/${contact}`, {
          method: "DELETE",
        });

        const filteredPosts = allContacts.filter((item) => item._id !== contact);

        setAllContacts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col gap-3 pt-8">
        <div>
          <div className='w-full flex items-center justify-center'>
            <input type="text" placeholder='Search' value={searchText} onChange={handleSearchChange} className='p-3 w-[40%] justify-center rounded bg-[#f1f3f4] text-black focus:outline-none' />
          </div>
          <div className='w-full p-10 pb-2'>
            <div className='flex items-center justify-between'>
              <div className="flex items-center">
                <h1 className='text-2xl '>Contacts</h1>
                <small>
                ({allContacts.length})
                </small>
              </div>
              <div>
              <Link href="/create-contact">
                <button className='transition-all bg-[#c2e7ff] hover:bg-[#38bdf8] text-black p-3 rounded-md'>
                    Create Contact
                </button>
                  </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-10 pt-0">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b-[1px] border-gray-600">
                <th className="py-3 w-1/6">Name</th>
                <th className="py-3 w-1/6 xs:hidden">Email</th>
                <th className="py-3 w-1/6">Phone Number</th>
                <th className="py-3 w-1/6 xs:hidden sm:hidden">Job Title</th>
                <th className="py-3 w-1/6 xs:hidden sm:hidden md:hidden lg:hidden ">Note</th>
                <th className="py-3 w-[5%] xs:w-[10%] sm:w-[10%] md:w-[10%] lg:w-[10%]">Edit</th>
                <th className="py-3 w-[5%] xs:w-[10%] sm:w-[10%] md:w-[10%] lg:w-[10%]">Delete</th>
              </tr>
            </thead>
            <tbody>
              {searchText ? (
                <ContactCardList data={searchedResults} handleEdit={handleEdit} handleDelete={handleDelete} />
              ) : (
                <ContactCardList data={allContacts} handleEdit={handleEdit} handleDelete={handleDelete} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Feed