import Link from "next/link";

const Form = ({ type, contact, setContact, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex flex-col  justify-center p-4">
      <h1 className="mt-5 text-6xl font-extrabold leading-[1.15] text-white sm:text-4xl text-left">
        {type} Contact
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-5 w-full flex flex-col gap-5"
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Name
          </span>

          <input
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            placeholder='Name'
            required
            className='w-[50%] flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Email
          </span>
          <input
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            type='text'
            placeholder='Email'
            className='w-[50%] flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Phone Number
          </span>
          <input
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            type='number'
            placeholder='Phone Number'
            className='w-[50%] flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Job Title
          </span>
          <input
            value={contact.jobtitle}
            onChange={(e) => setContact({ ...contact, jobtitle: e.target.value })}
            type='text'
            placeholder='Job Title'
            className='w-[50%] flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Note
          </span>
          <textarea
            value={contact.Note}
            onChange={(e) => setContact({ ...contact, note: e.target.value })}
            type='text'
            placeholder='Note'
            className='w-[50%] flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/contacts' className='text-gray-500 text-sm mx-3'>
            <button className="bg-gray-900 px-5 py-1.5 text-sm rounded-full transition-all hover:bg-[red] hover:text-white">
            Cancel
            </button>
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-[#38bdf8] transition-all hover:bg-blue-500  hover:opacity-90 rounded-full text-white'
          >
            {submitting ? `Creating...` : type}
          </button>
        </div>

      </form>

    </section>
  )
}

export default Form