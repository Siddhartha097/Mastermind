import Image from 'next/image';
import React from 'react'

interface EmptyProps {
    label: string;
}

const Empty = ({ label } : EmptyProps) => {
  return (
    <div className='h-full p-20 flex-col flex items-center justify-center'>
        <div className=' relative h-72 w-72'>
            <Image
                alt='empty'
                src={'/empty.png'}
                fill
            />
        </div>
        <p className=' text-muted-foreground text-sm text-center'>
            {label}
        </p>
    </div>
  )
}

export default Empty