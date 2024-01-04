'use client'

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import OpenAI from 'openai';

import { useRouter } from 'next/navigation';
import { MessagesSquare } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormSchema } from './constants';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import Heading from '@/components/Heading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/UserAvatar';
import BotAvatar from '@/components/BotAvatar';

const Conversation = () => {

    const router = useRouter();

    const [messages, setMessages] = useState<OpenAI.Chat.CreateChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: ''
        }
    });

    

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            const userMessage : OpenAI.Chat.ChatCompletionMessage = {
                role: 'user',
                content: values.prompt,
            };

            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/conversation', {
                messages: newMessages,
            });

            setMessages((current) => [...current, userMessage, response.data]);

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
                console.log(error);
            }
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading 
                title='Conversation'
                description='Our advanced AI conversation model '
                icon={MessagesSquare}
                iconColor='text-violet-500'
                bgColor='bg-violet-500/10'
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
                                                placeholder='How to play cricket?'
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
                    {messages.length === 0 && !isLoading && (
                        <Empty label='No conversation started yet!' />
                    )}
                    <div className='flex flex-col-reverse gap-y-4'>
                        {messages.map(message => (
                            <div
                                className={cn(
                                    'p-8 w-full flex items-start gap-x-8 rounded-lg',
                                    message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted',
                                    )} 
                                key={message.content}
                            >
                                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                                <p className='text-sm'>
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>           
        </div>
    )
}

export default Conversation