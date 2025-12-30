import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  const { userData } = await request.json();

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat:free",
      messages: [{ role: "user", content: userData }],
    });

    const text = response.choices[0]?.message?.content || "No response";
    return Response.json({ text });
  } catch (openAIError) {
    console.error('OpenRouter/DeepSeek API error:', openAIError);
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-001' });

    const result = await model.generateContent(userData);
    const response = await result.response;
    const text = response.text();

    return Response.json({ text });
  } catch (geminiError) {
    console.error('Gemini API error:', geminiError);
    return Response.json({ error: (geminiError as Error).message }, { status: 500 });
  }
}
