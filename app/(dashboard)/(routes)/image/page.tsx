'use client'

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import OpenAI from 'openai';

import { useRouter } from 'next/navigation';
import { Download, ImageIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormSchema, amountOptions, resolutionOptions } from './constants';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import Heading from '@/components/Heading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import toast from 'react-hot-toast';


const ImageGenerator = () => {

    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: '',
            amount: '1',
            resolution: '512x512',
        }
    });

    

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            setImages([]);

            const response = await axios.post('/api/image', values);

            const urls = response.data.map((image: { url: string }) => image.url);

            setImages(urls);

            form.reset();

        } catch (error : any) {
            //open pro model
            if (error instanceof OpenAI.APIError) {
                console.error(error.status);  // e.g. 401
                console.error(error.message); // e.g. The authentication token you passed was invalid...
                console.error(error.code);  // e.g. 'invalid_api_key'
                console.error(error.type);  // e.g. 'invalid_request_error'
            } else {
                // Non-API error
                toast.error('Something went wrong');
            }
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading 
                title='Image Generator'
                description='Turn your prompts into images'
                icon={ImageIcon}
                iconColor='text-amber-500'
                bgColor='bg-amber-500/10'
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
                                    <FormItem className=' col-span-12 lg:col-span-6'>
                                        <FormControl className='m-0 p-0'>
                                            <Input 
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='A picture of a cow in a big field'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name='amount'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2'>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}  
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map(option => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name='resolution'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2'>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}  
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map(option => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
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
                    {images.length === 0 && !isLoading && (
                        <Empty label='No images genreated yet!' />
                    )}
                    <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
                        {images.map(src => (
                            <Card
                                key={src}
                                className=' rounded-lg overflow-hidden'
                            >
                                <div className='relative aspect-square '>
                                    <Image 
                                        alt='image'
                                        src={src}
                                        fill
                                    />
                                </div>
                                <CardFooter className='p-2'>
                                    <Button 
                                        variant={'secondary'} 
                                        className='w-full'
                                        onClick={() => window.open(src)}
                                    >
                                        <Download className='h-4 w-4 mr-2' />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>           
        </div>
    )
}

export default ImageGenerator