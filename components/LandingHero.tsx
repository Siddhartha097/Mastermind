'use client'

import { useAuth } from '@clerk/nextjs'
import React from 'react'
import TypeLoop from './TypeLoop';
import Link from 'next/link';
import { Button } from './ui/button';

const LandingHero = () => {

    const { isSignedIn } = useAuth();

    const typeStrings = [
        'Chatbot',
        'Music Generation',
        'Image Generation',
        'Video Generation',
        'Code Generation',
        'Entertainment',
    ];

    return (
        <div className='text-white font-bold py-32 text-center space-y-6'>
            <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-6 font-extrabold'>
                <h1>
                    Experience Mastermind!
                </h1>
                <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-2 font-bold'>
                    The Best AI tool for 
                    </h1>
                    <div className='h-full py-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-600'>
                        <TypeLoop 
                            strings={typeStrings}
                        />
                    </div>
                </div>
                {/* <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pt-3'>
                    The Best AI tool for 
                </h1>
                <div className='pb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-600'>
                    <TypeLoop 
                        strings={typeStrings}
                    />
                </div> */}
            </div>
            <div className='text-sm md:text-xl font font-light text-zinc-400'>
                Create content using AI 10x faster!
            </div>
            <div>
                <Link href={isSignedIn ? '/dashboard' : '/signup'}>
                    <Button variant={'premium'} className=' capitalize md:text-lg p-4 md:p-6 rounded-full font-semibold'>
                        Start generating for free
                    </Button>
                </Link>
            </div>
            <div className='text-zinc-500 text-xs md:text-sm font-normal'>
                No credit card required!
            </div>
        </div>
    )
}

export default LandingHero