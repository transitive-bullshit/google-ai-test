import 'dotenv/config'

import { GoogleGenAI } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const res = await genai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents: 'Create an image'
  })

  console.log(JSON.stringify(res, null, 2))
}

await main()
