import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || 'string',
});

// const instructionMessage : OpenAI.Chat.ChatCompletionMessage = {
//   role: 'system',
//   content: 'You are an advanced AI. You wil answer to any informative and conversational questions and give a fruitful, correct and satisfying answer.'
// }

export async function POST ( req: Request ) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt
        }
      }
    );    

    return NextResponse.json(response);
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}