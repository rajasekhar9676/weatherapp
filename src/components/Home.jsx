import React from 'react'

const Home = () => {
  return (
    <div className='bg-blue-200 w-full h-screen '>
      <div className='bg-white shadow-md rounded-md  m-5 border-1 w-full h-full p-4 gap-4'>
        <div className='h-[10%]'>
        <h1 className='text-2xl font-bold'>Weather Dashboard</h1>
        </div>
        <div className='flex flex-row w-3/4 h-[10%]'>
        <input type='search' placeholder='Enter city Name...' className='w-full bg-gray-200 focus:outline-none rounded-full px-4'/>
      <button className='bg-green-500 px-5 font-bold py-3 rounded-full text-white ml-4'>Search</button>
      </div>

      <div className='bg-blue-100 shadow-md rounded w-full mt-3 rounded-lg h-[40%] px-3 py-3'>
      <div>
        <h2 className='text-xl font-bold'>Current Weather in New York</h2>
        <p className='text-7xl font-bold'>23 C</p>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Home




































