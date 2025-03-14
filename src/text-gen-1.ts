import 'dotenv/config'

import { GoogleGenAI } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const res = await genai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents: 'write a short poem about a cat who loves google',
    config: {
      temperature: 1.2,
      candidateCount: 3,
      seed: 33,
      responseModalities: ['text']
    }
  })

  console.log(JSON.stringify(res, null, 2))
}

await main()
