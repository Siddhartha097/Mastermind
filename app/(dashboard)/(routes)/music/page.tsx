'use client'

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import { Music } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormSchema } from './constants';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import Heading from '@/components/Heading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import toast from 'react-hot-toast';

const MusicGenerator = () => {

    const router = useRouter();

    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: ''
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            setMusic(undefined);

            const response = await axios.post('/api/music', values);

            setMusic(response.data.audio);

            form.reset();
        } catch (error : any) {
            //open pro model
            toast.error('Something went wrong');
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading 
                title='Music Generator'
                description='Turn your prompts into musics'
                icon={Music}
                iconColor='text-red-500'
                bgColor='bg-red-500/10'
            />

            <div className='px-4 lg:px-8'>
                <div>
                    <Form
                    {...form}
                    >
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
                        >
                            <FormField 
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className=' col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input 
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='Guiter solo'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className=' col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className=' space-y-4 mt-4 '>
                    {isLoading && (
                        <div className=' p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                            <Loader />
                        </div>
                    )}
                    {!music && !isLoading && (
                        <Empty label='No music generated yet!' />
                    )}
                    {music && (
                        <audio controls className='w-full mt-8'>
                            <source src={music}/>
                        </audio>
                    )}
                </div>
            </div>           
        </div>
    )
}

export default MusicGenerator