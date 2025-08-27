import 'dotenv/config'

import { GoogleGenAI } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const res = await genai.models.generateContent({
    model: 'gemini-2.5-pro-exp-03-25',
    contents: 'write a short poem about a cat who loves google',
    config: {
      responseModalities: ['text']
    }
  })

  console.log(JSON.stringify(res, null, 2))
}

await main()
