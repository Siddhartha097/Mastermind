'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
    bgcolor: 'bg-violet-500/10',
  },
  {
    label: 'Image Generator',
    icon: ImageIcon,
    href: '/image',
    color: 'text-amber-600',
    bgcolor: 'bg-amber-600/10',
  },
  {
    label: 'Video Generator',
    icon: VideoIcon,
    href: '/video',
    color: 'text-pink-700',
    bgcolor: 'bg-violet-700/10',
  },
  {
    label: 'Music Generator',
    icon: Music,
    href: '/music',
    color: 'text-red-500',
    bgcolor: 'bg-red-500/10',
  },
  {
    label: 'Code Generator',
    icon: Code,
    href: '/code',
    color: 'text-emerald-600',
    bgcolor: 'bg-emerald-600/10',
  },
]

const Dashboard = () => {

  const router = useRouter();

  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className=' text-2xl md:text-4xl font-bold text-center'>
          Explore The Mastermind AI
        </h2>
        <p className=' text-muted-foreground font-light text-sm md:text-lg text-center'>
          Chat and Experience of power of AI - Enjoy your time with smartest AI
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-3 space-y-4'>
        {tools.map(tool => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'
          >
            <div className='flex items-center gap-x-4'>
              <div className={cn('p-2 w-fit rounded-md', tool.bgcolor)}>
                <tool.icon className={cn('w-8 h-8', tool.color)} />
              </div>
              <div className='font-semibold'>
                {tool.label}
              </div>
            </div>
            <ArrowRight className='w-5 h-5' />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard