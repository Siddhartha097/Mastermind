'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from '@/components/Sidebar'

const MobileSidebar = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant={'ghost'} size={'icon'} className='md:hidden'>
                    <Menu /> 
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'} className='p-0'>
                <Sidebar />
            </SheetContent>
            <time dateTime="2024-10-25" suppressHydrationWarning={true} />
        </Sheet>
    )
}

export default MobileSidebar