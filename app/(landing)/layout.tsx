import React from 'react'

const LandingLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <main className=' h-screen overflow-auto bg-[#081b29]'>
      <div className='w-full h-full max-w-screen-xl mx-auto'>
        {children}
      </div>
    </main>
  )
}

export default LandingLayout