import React from 'react'

const LandingLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <main className=' overflow-auto bg-[#081b29] h-full'>
        <div className=' h-full w-full mx-auto max-w-screen-xl'>
            {children}
        </div>
    </main>
  )
}

export default LandingLayout