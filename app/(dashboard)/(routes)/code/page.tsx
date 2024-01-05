'use client'

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import OpenAI from 'openai';

import { useRouter } from 'next/navigation';
import { Code } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';

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
import toast from 'react-hot-toast';

const CodeGenerator = () => {

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

            const response = await axios.post('/api/code', {
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
                toast.error('Something went wrong');
            } 
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading 
                title='Code Generator'
                description='Generate code using descriptive text '
                icon={Code}
                iconColor='text-emerald-600'
                bgColor='bg-emerald-600/10'
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
                                                placeholder='How to print a star pattern in JAVA?'
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
                        <Empty label='No code generated yet!' />
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
                                <ReactMarkdown
                                    components={{
                                        pre: ({ node, ...props }) => (
                                            <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                                                <pre {...props} />
                                            </div>
                                        ),
                                        code: ({ node, ...props }) => (
                                            <code className='bg-black/10 rounded-lg p-1' {...props} />
                                        )
                                    }}
                                    className={'text-sm overflow-hidden leading-8'}
                                >
                                    {message.content || ''}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>           
        </div>
    )
}

export default CodeGenerator