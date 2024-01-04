import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const instructionMessage : OpenAI.Chat.ChatCompletionMessage = {
  role: 'system',
  content: 'You are an advanced AI. You wil answer to any informative and conversational questions and give a fruitful, correct and satisfying answer.'
}

export async function POST ( req: Request ) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resoulution = '512x512' } = body;
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse('Openai API Key not configured', { status: 500 });
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }
    if (!amount) {
      return new NextResponse('amount is required', { status: 400 });
    }
    if (!resoulution) {
      return new NextResponse('Resoulution is required', { status: 400 });
    }

    const response = await openai.images.generate({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resoulution,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}